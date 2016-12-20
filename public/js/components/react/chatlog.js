class ChatLog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            chatlog: [],
            socket: null,
        };

        var t = this;
        //socket listeners
        s.on('lobby_created', function () {
            if(t.state.socket == null) {
                var socket = io.connect('http://' + window.location.hostname + ':3000' + '/lobby/' + roomname);
                socket.id = userID;
                socket.on('chat_message', function (msg) {
                    t.receiveMessage(msg);
                });

                socket.on('connect', function () {
                    alert('connected');
                });

                t.setState({socket: socket,});
            }

        });


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

ReactDOM.render(<ChatLog/>, document.getElementById('lobbychat'));