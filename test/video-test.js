// video-test.js
//
// Test the video module
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

var assert = require('assert'),
    vows = require('vows'),
    databank = require('databank'),
    URLMaker = require('../lib/urlmaker').URLMaker,
    modelBatch = require('./lib/model').modelBatch,
    Databank = databank.Databank,
    DatabankObject = databank.DatabankObject;

// Need this to make IDs

URLMaker.hostname = "example.net";

// Dummy databank

DatabankObject.bank = Databank.get('memory', {});

var suite = vows.describe('video module interface');

var testSchema = {
    pkey: "id",
    fields: ['author',
             'displayName',
             'embedCode',
             'published',
             'stream',
             'summary',
             'updated',
             'url']
};

var testData = {
    'create': {
        displayName: "Watch me dunk a basketball",
        summary: "I can dunk!",
        embedCode: "<video>"+
            "<source type='video/ogg' "+
            "src='http://example.com/videos/watch-me-dunk-a-basketball.ogv' >"+
            "</video>",
        stream: {
            url: "http://example.com/videos/watch-me-dunk-a-basketball.ogv",
            duration: 77,
            width: 320,
            height: 480
        },
        url: "http://example.com/videos/watch-me-dunk-a-basketball.html"
    },
    'update': {
        displayName: "Watch me almost dunk a basketball",
        summary: "So close!"
    }
};

suite.addBatch(modelBatch('video', 'Video', testSchema, testData));

suite.export(module);
