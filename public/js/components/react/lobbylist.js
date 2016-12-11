class LobbyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lobbyname: '',
            lobbypass: '',
            hostname: window.location.hostname,
            lobbies: [],
        };

        var t = this;
        $.post("http://" + window.location.hostname + "/getlobbies", {
            _token: $('meta[name=csrf-token]').attr('content'),
        }).done(function (data) {
            t.setState({lobbies: data});
        });

        this.createLobby = this.createLobby.bind(this);
        this.handleLobbyName = this.handleLobbyName.bind(this);
        this.handleLobbyPass = this.handleLobbyPass.bind(this);
    }

    createLobby(event){
        var body = this.state;
        $.post("http://" + window.location.hostname + "/createlobby", {
            _token: $('meta[name=csrf-token]').attr('content'),
            name: body.lobbyname,
            password: body.lobbypass,
        }).done(function(lobby){
            window.location.href = lobby;
            //window.location.href = "http://" + window.location.hostname + "/lobby/" + lobby.name;
        });
        this.setState({lobbyname: '', lobbypass: ''});
        event.preventDefault();
    }

    handleLobbyName(event){
        this.setState({lobbyname: event.target.value});
    }

    handleLobbyPass(event){
        this.setState({lobbypass: event.target.value});
    }

    render() {
        var t = this;
        var style = {
            overflowY: 'auto',
            width: "100%",
            height: "200px",
        };

        return <div>
            <div style={style}>
            {this.state.lobbies.map(function(lobby, idx){
                var url = "/lobby?name=" + lobby.name + "&id=" + lobby.id;
                return <a href={url}>
                    <div>
                        {lobby.name}
                        <br/>
                        ID: {lobby.id}
                        <br/>
                        {lobby.members} Members
                    </div>
                    <hr/>
                </a>
            })}
            </div>
            <form onSubmit={this.createLobby}>
                <input id="lobbyname" autoComplete="off" placeholder="Lobby Name" value={this.state.lobbyname} onChange={this.handleLobbyName}/>
                <br/>
                <input id="lobbypass" autoComplete="off" placeholder="Password (optional)" value={this.state.lobbypass} onChange={this.handleLobbyPass}/>
                <br/>
                <button className="btn btn-default">Create Lobby</button>
            </form>
        </div>
    }
}

ReactDOM.render(<LobbyList/>, document.getElementById('lobbylist'));