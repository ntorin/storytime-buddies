class ChatLog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            chatlog: [],
        };

        var t = this;

        //socket listeners
        socket.on('chat_message', function (msg) {
            t.receiveMessage(msg);
        });

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
    }

    sendMessage(event) {
        socket.emit('chat_message', this.state.msg);
        event.preventDefault();

    }

    receiveMessage(msg){
        var chatlog = this.state.chatlog;
        chatlog.push(msg);
        this.setState({chatlog: chatlog, msg: ''});
    }

    handleChange(event) {
        this.setState({msg: event.target.value});
    }

    render() {
        return <div>
            <ul id="messages">
                {this.state.chatlog.map(function(msg, idx){
                    return <li>{msg}</li>
                })}
            </ul>
            <form onSubmit={this.sendMessage}>
                <input id="m" autocomplete="off" value={this.state.msg} onChange={this.handleChange}/>
                <button>Send</button>
            </form>
        </div>
    }
}

ReactDOM.render(<ChatLog/>, document.getElementById('lobbychat'));