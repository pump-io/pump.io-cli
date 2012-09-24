// follow.js
//
// follow another user
//
// Copyright 2011-2012, StatusNet Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var _ = require("underscore"),
    Step = require("step"),
    url = require("url"),
    common = require("./common"),
    userCred = common.userCred,
    postJSON = common.postJSON,
    argv = require("optimist")
        .usage("Usage: $0 -u <username> -o <other>")
        .demand(["u", "o"])
        .alias("u", "username")
        .alias("o", "other")
        .alias("s", "server")
        .alias("P", "port")
        .describe("u", "User nickname")
        .describe("o", "Other user to follow")
        .describe("s", "Server name (default 'localhost')")
        .describe("P", "Port (default 80)")
        .default("P", 80)
        .default("s", "localhost")
        .argv,
    username = argv.u,
    server = argv.s,
    note = argv.n,
    port = argv.P,
    otherId = argv.o;

if (otherId.indexOf("@") === -1) {
    otherId = otherId + "@" + server;
}

if (otherId.substr(0, 5) != "acct:") {
    otherId = "acct:" + otherId;
}

Step(
    function() {
        userCred(username, server, this);
    },
    function(err, cred) {
        if (err) throw err;
	var activity = {
            "verb": "follow",
	    "object": {
		"objectType": "person",
		id: otherId
	    }
	};
        var endpoint = url.format({
            protocol: ((port == 443) ? "https" : "http"),
            host: ((port == 80) ? server : server + ":" + port),
            pathname: "/api/user/"+username+"/feed"
        });
        postJSON(endpoint, cred, activity, this);
    },
    function(err, body, resp) {
        if (err) {
            console.error(err);
        } else {
            console.log("OK");
        }
    }
);
