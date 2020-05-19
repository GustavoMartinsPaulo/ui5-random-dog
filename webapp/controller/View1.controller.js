sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ovly.random-dog.controller.View1", {
		endpoint: "https://random.dog/woof.json",
		
		onInit: function () {
			this.callAPI();
		},
		
		onGetRandomDog: function (oEvent) {
			this.byId("page").setBusy(true);
			this.callAPI();
		},
			
		callAPI: function () {
			var callback = $.proxy(this._updatePicture, this);
			$.get(this.endpoint, callback);
		},
			
		_updatePicture: function (result) {
			var sSource = result.url;
			var oVideo = $("video");
			if(sSource.endsWith("mp4")){
				var oVideoSource = oVideo.find("source");
				
				this.byId("image-container").setVisible(false);
				oVideo.prop("hidden", false);
				
				oVideoSource.attr("src", sSource);
				oVideo.load();
				this.byId("page").setBusy(false);
			}else{
				oVideo.prop("hidden", true);
				
				this.byId("image-container").setSrc(result.url).setVisible(true);
				this.byId("page").setBusy(false);
			}
		}
	});
});