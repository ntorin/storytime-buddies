class StoryWriter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            passage: '',
            socket: null,
        };

        var t = this;

        //socket listeners
        s.on('lobby_created', function () {
            if(t.state.socket == null) {
                alert('socket added');
                var socket = io.connect('http://' + window.location.hostname + ':3000' + '/lobby?name=' + getQueryParameter('name') + '&id=' + getQueryParameter('id'));
                socket.on('story_append', function (msg) {
                    t.receiveStoryAppend(msg);
                });

                socket.on('story_publish', function (msg) {
                    t.publishStory();
                });
                t.setState({socket: socket,});
            }
        });


        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.receiveStoryAppend = this.receiveStoryAppend.bind(this);
    }

    publishStory() {
        var body = this.state;
        $.post("http://" + window.location.hostname + "/publishstory", {
            _token: $('meta[name=csrf-token]').attr('content'),
            name: "Test Story",
            passage: body.passage,
            editing: 0,
            completed: 1,
        }).done(function (data) {
            alert(data);
        });
    }

    sendMessage(event) {
        this.state.socket.emit('story_append', this.state.msg);
        alert('emitting');
        event.preventDefault();

    }

    receiveStoryAppend(msg) {
        var passage = this.state.passage;
        passage += " " + msg;
        this.setState({passage: passage, msg: ''});
    }

    handleChange(event) {
        this.setState({msg: event.target.value});
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
                    <button>Send</button>
                </form>
            </div>
        }
    }
}

ReactDOM.render(<StoryWriter/>, document.getElementById('storywriter'));