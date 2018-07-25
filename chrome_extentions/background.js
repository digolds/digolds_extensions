// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({base_url: 'https://www.digolds.cn'}, function() {
    console.log("The color is green.");
  });

  chrome.contextMenus.create({
    "title": "采集图片",
    "contexts": ["image"],
    "id" : "yu"
  });
  
});

chrome.contextMenus.onClicked.addListener(function(e,t) {
        if (e.mediaType === "image") {
            let data = {
                "image_url" : e.srcUrl
			};
			chrome.storage.sync.get(['base_url'], function(result) {
				$.post(result.base_url + '/api/v1/image_resource/create', data,
				function(result)
				{
					if(result && result.img_obj)
					{
						chrome.tabs.executeScript(t.id,{
							file: 'uikit.min.js'
						  });
						  chrome.tabs.insertCSS(t.id,{
							file: 'uikit.min.css'
						  });
						chrome.tabs.executeScript(t.id,{
							code: "UIkit.notification('采集图像成功');"
						  });
					}
					else
					{
						alert('采集图片失败');
					}
				}
			);
			  });
        }
        else{
            alert("采集图片失败")
        }
  });