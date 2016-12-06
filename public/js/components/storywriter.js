class StoryWriter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            story: '',
        };

        var t = this;

        //socket listeners
        socket.on('story_append', function (msg) {
            t.receiveStoryAppend(msg);
        });

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.receiveStoryAppend = this.receiveStoryAppend.bind(this);
    }

    sendMessage(event) {
        socket.emit('story_append', this.state.msg);
        event.preventDefault();

    }

    receiveStoryAppend(msg){
        var story = this.state.story;
        story += " " + msg;
        this.setState({story: story, msg: ''});
    }

    handleChange(event) {
        this.setState({msg: event.target.value});
    }

    render() {
        return <div>
            <p id="story">
                {this.state.story}
            </p>
            <form onSubmit={this.sendMessage}>
                <input id="m" autocomplete="off" value={this.state.msg} onChange={this.handleChange}/>
                <button>Send</button>
            </form>
        </div>
    }
}

ReactDOM.render(<StoryWriter/>, document.getElementById('storywriter'));