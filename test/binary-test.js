// binary-test.js
//
// Test the binary module
//
// Copyright 2012, StatusNet Inc.
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

var assert = require("assert"),
    vows = require("vows"),
    databank = require("databank"),
    URLMaker = require("../lib/urlmaker").URLMaker,
    modelBatch = require("./lib/model").modelBatch,
    Databank = databank.Databank,
    DatabankObject = databank.DatabankObject;

var suite = vows.describe("binary module interface");

var testSchema = {
    pkey: "id",
    fields: ["attachments",
             "author",
             "content",
             "displayName",
             "downstreamDuplicates",
             "id",
             "image",
             "objectType",
             "published",
             "summary",
             "updated",
             "upstreamDuplicates",
             "url",
             "uuid",
             "compression",
             "data",
             "fileUrl",
             "length",
             "md5",
             "mimeType"],
    indices: ["uuid"]
};

var testData = {
    "create": {
        displayName: "The traditional greeting",
        data: "SGVsbG8sIFdvcmxkCg==",
        length: 13,
        md5: "9af2f8218b150c351ad802c6f3d66abe",
        mimeType: "text/plain"
    },
    "update": {
        data: "SGVsbG8gYWdhaW4sIFdvcmxkCg==",
        length: 19,
        md5: "a89617014e7be8529deb55473795320c"
    }
};

suite.addBatch(modelBatch("binary", "Binary", testSchema, testData));

suite["export"](module);
