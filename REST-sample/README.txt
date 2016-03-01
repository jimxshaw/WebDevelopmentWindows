Overview

What is REST?
Roy Fielding wrote a dissertation in the early 2000s. He coins the term representational state transfer or REST. He lays
out a series of constraints that should be in place whenever two systems talk to each other. It's a series of rules in
place for your server, so that everyone who uses your service understands what it does and how it works.

The first is the Client-Server constraint. You have a client and a server. The client sends a request to the
server and the server sends a response back to the client.

The second is the Stateless Server constraint. As the load increases on your server, you add more servers to the mix and
when that happens you could face a situation where the server may contain some information about the client that doesn't
transfer from one server to the other. It's recommended to not get to this situation in the first place. The client should
send a request to the server and it shouldn't matter what server it goes to. Everything that the server is going to need
to process that request should be included in that request. If you find yourself storing information about the request
or about the client then it's not a true RESTful service.

The third is the caching constraint. As servers are sending back responses full of data, sometimes certain data don't change
much. Think of a list of contacts or addresses. That data likely won't change 5 minutes from the present. This constraint
says let the client know how long this data is good for so that the client doesn't have to come back to the server repeatedly
for it.

The fourth is the uniform resource constraint. When you're dealing with a RESTful service interface, it will behave in a
specific way that is uniform from one service to the next. There are several pieces to the interface that should always operate
this way.

resource (nouns) : essentially what this means is that you're dealing with nouns. Uniform interfaces are built around things,
not actions. So for this sample project, the nouns are books and authors. Both of them are the resources that each of our
REST services will deal with. For example, dealing with a book the URL will be http://something/book and with authors the
URL will be http://something/author. That's the way a REST service will be defined every time.

HTTP verbs : GET, POST, DELETE, PUT, PATCH.

HATEOS : Hypermedia as the Engine of Application State. It means each request will be a set of hyperlinks that you can use
to navigate the API. It's the API's way of letting you know what other actions you can take on this particular resource.












