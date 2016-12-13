class LibraryPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
        };

        var t = this;
        $.post("http://" + window.location.hostname + "/getstorypreviews", {
            _token: $('meta[name=csrf-token]').attr('content'),
        }).done(function (data) {
            t.setState({stories: data});
        });
    }

    render() {
        return <div id="libcarousel" className="carousel slide" data-ride="carousel" style={{height: '30vh'}}>
            <ol className="carousel-indicators">
                {this.state.stories.map(function (story, idx) {
                    if (idx == 0) {
                        return <li key={idx} data-target="#libcarousel" data-slide-to={idx} className="active"></li>
                    } else {
                        return <li key={idx} data-target="#libcarousel" data-slide-to={idx}></li>
                    }
                })}
            </ol>

            <div className="carousel-inner" role="listbox">
                {this.state.stories.map(function (story, idx) {
                    if (idx == 0) {
                        return <div key={idx} className="item active"><h3>{story.name}</h3>
                            <br/>{story.passage}</div>
                    } else {
                        return <div key={idx} className="item"><h3>{story.name}</h3>
                            <br/>{story.passage}</div>
                    }
                })
                }
            </div>

            <a className="left carousel-control" href="#libcarousel" role="button" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#libcarousel" role="button" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>;
    }
}

ReactDOM.render(<LibraryPreview/>, document.getElementById('libpreview'));
