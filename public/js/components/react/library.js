class Library extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            searchResults: [],
            comments: [],
            comment: '',
            selectedStory: null,
            disableInputs: false,
        };

        this.handleSearchQuery = this.handleSearchQuery.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.changeArchive = this.changeArchive.bind(this);
        this.handleCommentMessage = this.handleCommentMessage.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }


    handleSearchQuery(event) {
        this.setState({searchQuery: event.target.value});
    }

    handleSearch(event) {
        var t = this;
        this.setState({disableInputs: true});
        $.post("http://" + window.location.hostname + "/getsearchquery", {
            _token: $('meta[name=csrf-token]').attr('content'),
            searchQuery: t.state.searchQuery,
        }).done(function (data) {
            t.setState({searchResults: data, disableInputs: false,});
        });
        event.preventDefault();
    }

    changeArchive(idx) {
        var t = this;
        this.setState({selectedStory: this.state.searchResults[idx]});
        $.post("http://" + window.location.hostname + "/getcomments", {
            _token: $('meta[name=csrf-token]').attr('content'),
            storyid: t.state.searchResults[idx].id,
        }).done(function (data) {
            t.setState({comments: data});
        })
    }

    handleCommentMessage(event) {
        this.setState({comment: event.target.value});
    }

    submitComment(event) {
        var t = this;
        this.setState({disableInputs: true});
        $.post("http://" + window.location.hostname + "/postcomment", {
            _token: $('meta[name=csrf-token]').attr('content'),
            comment: t.state.comment,
            storyid: t.state.selectedStory.id,
            userid: userID,
        }).done(function (data) {
            t.setState({comments: data, comment: '', disableInputs: false,});
        });
        event.preventDefault();
    }


    render() {
        var t = this;
        var passage = '';
        var commentsection = <div id="comments" className="col-xs-12"></div>;
        if (this.state.selectedStory != null) {
            passage = this.state.selectedStory.passage;
            commentsection = (
                <div id="comments" className="col-xs-12" >
                    <ul style={{overflowY: 'auto', height: '25vh'}}>
                        {this.state.comments.map(function (comment, idx) {
                            return <li>
                                {comment.comment}
                                <hr/>
                            </li>
                        })}
                    </ul>
                    <br/>
                    <form onSubmit={this.submitComment}>
                        <input id="comment" autoComplete="off" placeholder="Add a comment ..."
                               value={this.state.comment} onChange={this.handleCommentMessage}
                               disabled={this.state.disableInputs} style={{width: "100%"}}/>
                    </form>
                </div>);
        }
        return <div>
            <div id="searchbar" className="col-xs-12">
                <form onSubmit={this.handleSearch}>
                    <input id="search" autoComplete="off" placeholder="Search the Library ..."
                           value={this.state.searchQuery} onChange={this.handleSearchQuery}
                           disabled={this.state.disableInputs} style={{width: "100%"}}/>
                </form>
            </div>
            <div id="storyarchive" className="col-xs-8" style={{overflowY: 'auto', height: '50vh'}}>
                {passage}
            </div>
            <div id="results" className="col-xs-4" style={{overflowY: 'auto', height: '50vh'}}>
                <ul>
                    {this.state.searchResults.map(function (searchResult, idx) {
                        return <li onClick={function () {
                            t.changeArchive(idx)
                        }}>{searchResult.name}
                            <hr/>
                        </li>
                    })}
                </ul>
            </div>
            {commentsection}
        </div>
    }
}

ReactDOM.render(<Library/>, document.getElementById('library'));