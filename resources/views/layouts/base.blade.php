<!DOCTYPE html>
<!-- saved from url=(0041)https://getbootstrap.com/examples/navbar/ -->
<html lang="en"><head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Storytime Buddies</title>
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css') }}"/>
    <link rel="stylesheet" href="{{asset('css/base.css')}}" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.2/react.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.2/react-dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
    <script src="{{asset('js/bootstrap.min.js') }}"></script>
    <script>
       // var socket = io.connect('http://' + window.location.hostname + ':3000');
    </script>
</head>
<body>
<div class="container-fluid">
    <!-- Static navbar -->
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="{{url('/')}}">Storytime Buddies</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><a href="{{url('/')}}">Home</a></li>
                    <li><a href="{{url('/library')}}">Library</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="{{url('/register')}}">Register</a></li>
                    <li><a href="{{url('/login')}}">Login</a></li>
                </ul>
            </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
    </nav>
    @yield('content')
</div> <!-- /container -->
<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
</body></html>