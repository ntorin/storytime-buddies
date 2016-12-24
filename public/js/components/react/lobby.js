class Lobby extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            password: '',
            valid: true,
            socket: null,
            lobbyList: [],
        };

        var t = this;

        //socket listeners
        s.on('lobby_created', function (clientArray) {

            if(t.state.socket == null) {
                var socket = io.connect('http://' + window.location.hostname + ':3000' + '/lobby/' + roomname);
                socket.userid = userID;
                t.setState({socket: socket, lobbyList: clientArray,});
            }
        });

        this.handleChange = this.handleChange.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }

    checkPassword(event){
        //testing ongoing
        if(this.state.password == room.lobby.password){
            this.setState({valid: true,});
        }

        event.preventDefault();
    }

    handleChange(event){
        this.setState({password: event.target.value});
    }

    render(){
        if(this.state.valid && this.state.socket != null) {
            return <div>
                <div id="storywriter" className="col-xs-8">
                    <StoryWriter socket={this.state.socket}/>
                </div>
                <div id="lobbychat" className="col-xs-4">
                    <ChatLog socket={this.state.socket}/>
                </div>
            </div>
        }else{
            return <div style={{margin: 'auto', width: '50%' }}>
                <form onSubmit={this.checkPassword}>
                    Enter Password: <input type="password" id="password" value={this.state.password} onChange={this.handleChange}/>
                    <button>Submit</button>
                </form>
            </div>
        }
    }
}

class StoryWriter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            passage: '',
            socket: this.props.socket,
            wordsLeft: '',
        };

        var t = this;

        //socket listeners
            if(t.state.socket != null) {
                t.state.socket.on('story_append', function (msg) {
                    t.receiveStoryAppend(msg);
                });

                t.state.socket.on('story_publish', function (msg) {
                    t.publishStory();
                });
                t.state.socket.on('publish_complete', function(storyid){

                    $.post("http://" + window.location.hostname + "/linkstorywriter", {
                        _token: $('meta[name=csrf-token]').attr('content'),
                        storyid: storyid,
                        userid: userID,
                    }).done(function (data) {
                    });
                });
            }


        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.receiveStoryAppend = this.receiveStoryAppend.bind(this);
    }

    publishStory() {
        var body = this.state;
        var t = this;
        $.post("http://" + window.location.hostname + "/publishstory", {
            _token: $('meta[name=csrf-token]').attr('content'),
            name: "Test Story",
            passage: body.passage,
            editing: 0,
            completed: 1,
        }).done(function (data) {
            t.state.socket.emit('publish_complete', data.id);
        });
    }

    sendMessage(event) {
        this.state.socket.emit('story_append', this.state.msg);
        event.preventDefault();
        $.post("http://" + window.location.hostname + "/updatestory", {
            _token: $('meta[name=csrf-token]').attr('content'),
            passage: body.passage,
        });

    }

    receiveStoryAppend(msg) {
        var passage = this.state.passage;
        passage += " " + msg;
        this.setState({passage: passage, msg: ''});
    }

    handleChange(event) {
        var wordcheck = event.target.value.split(" ");
        if(wordcheck.length <= room.lobby.word_limit){
            this.setState({msg: event.target.value, wordsLeft: (room.lobby.word_limit - wordcheck.length)});
        }
    }

    render() {
        if(this.state.socket == null){
            return <div></div>
        }else {
            return <div>
                <p id="story">
                    {this.state.passage}
                </p>
                <form onSubmit={this.sendMessage}>
                    <input id="m" autoComplete="off" value={this.state.msg} onChange={this.handleChange}/>
                    <button>Send</button> {this.state.wordsLeft}
                </form>
            </div>
        }
    }
}

class ChatLog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            chatlog: [],
            socket: this.props.socket,
        };

        var t = this;
        //socket listeners
            if(t.state.socket != null) {
                t.state.socket.on('chat_message', function (msg) {
                    t.receiveMessage(msg);
                });

                t.state.socket.on('connect', function () {
                });

            }


        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
    }

    sendMessage(event) {
        this.handleMessage(this.state.msg);
        this.setState({msg: ''});
        event.preventDefault();

    }

    handleMessage(msg) {
        switch (msg.toLowerCase()) {
            case '/publish':
                this.state.socket.emit('story_publish', msg);
                break;
            default:
                this.state.socket.emit('chat_message', msg);
                break;
        }
    }

    receiveMessage(msg) {
        var chatlog = this.state.chatlog;
        chatlog.push(msg);
        this.setState({chatlog: chatlog});
    }

    handleChange(event) {
        this.setState({msg: event.target.value});
    }

    render() {
        if(this.state.socket == null){
            return <div></div>
        }else {
            return <div>
                <ul id="messages">
                    {this.state.chatlog.map(function (msg, idx) {
                        return <li>{msg}</li>
                    })}
                </ul>
                <form onSubmit={this.sendMessage}>
                    <input id="m" autoComplete="off" value={this.state.msg} onChange={this.handleChange}/>
                    <button>Send</button>
                </form>
            </div>
        }
    }
}

ReactDOM.render(<Lobby/>, document.getElementById('lobby'));