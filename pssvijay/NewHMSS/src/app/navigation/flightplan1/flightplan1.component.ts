import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AppService } from '../../app.service';

@Component({
	selector: 'app-flightplan1',
	templateUrl: './flightplan1.component.html',
	styleUrls: ['./flightplan1.component.css']
})
export class Flightplan1Component implements OnInit {

	CHGFieldType:any='';
	CHGFieldType1:any="";
	selectedElement: any = '';
	startMsgType = "ZCZC";
	channelPrefix: string = '';
	originIndicator: string = '';
	priority = "SS";
	fillingTime = new Date();
	fileList: any = '';
	messageurl = "api/v1/aftn/message";
	sequenceUrl = "api/v1/aftn/bka/sequenceNum";
	groupIndicatorUrl = "api/v1/command/gi";
	drafturl = "api/v1/aftn/draft/";
	responseText: string = '';
	draftName: string = '';
	draftMsg: string = '';
	displaypopup: string = "";
	printData: string = "";
	displayData: string = '';
	index: number = 0;
	msgDraft: any;
	value1: any;
	outfocusvalue: string = "";
	value: any;
	keyWords = ["ZCZC", "CZC", "ZCZ", "NNNN"];
	partitionedAI: any = [];
	draftMsgParts: any = [];
	total: number;
	currentDateTime: string;
	sqnNo: string;
	sequenceNo: any;

	DI1: string; DI2: string; DI3: string; DI4: string; DI5: string; DI6: string; DI7: string; DI8: string; DI9: string; DI10: string; DI11: string;
	DI12: string; DI13: string; DI14: string; DI15: string; DI16: string; DI17: string; DI18: string; DI19: string; DI20: string; DI21: string;
	OI23: any;
	validateAI: string = "";
	totalAI = new Set();
	groupIndicators: any = [];
	selectedAdressIndicators: any = [];

	constructor(public serviceObject: AppService) {
		this.channelPrefix = this.serviceObject.getChannelPrefix();
		this.originIndicator = this.serviceObject.getOriginIndicator();
	}


	alphaOnly(event: any) {
		const pattern = /[a-zA-Z ]/g;
		let inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar) && event.charCode != '0') {
			event.preventDefault();
		}
	}

	alphaNum(event: any) {
		const pattern = /[a-zA-Z0-9 ]/g;
		let inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar) && event.charCode != '0') {
			event.preventDefault();
		}
	}

	numOnly(event: any) {
		const pattern = /[0-9 ]/g;
		let inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar) && event.charCode != '0') {
			event.preventDefault();
		}
	}

	checkLength(ElementId) {
		var DIElementId = <HTMLInputElement>document.getElementById(ElementId);
		if ((DIElementId.value.length > 0) && (DIElementId.value.length < DIElementId.maxLength)) {
			DIElementId.focus(); DIElementId.style.border = "1px solid red";
		}
		else {
			DIElementId.style.borderColor = "";
			// this.getDestinationIndicators();
			// var searchElement = new RegExp(DIElementId.value.toLocaleUpperCase(), 'gi');
			// var results = new Array();
			// while (searchElement.exec(this.validateAI)) {
			// 	results.push(searchElement.lastIndex);
			// }
			// var count = results.length;
			// console.log(this.validateAI);
			// console.log(count);
			// if (count > 1) {
			// 	alert("Duplicate Entries Of Value " + DIElementId.value.toLocaleUpperCase());
			// 	DIElementId.focus(); DIElementId.style.border = "1px solid red";
			// }
		}
	}

	ngOnInit() {
		this.clear();
		this.getCurrentDateTime();
		this.getLatestSequenceNo();
		this.getGroupIndicator();
	}

	getCurrentDateTime() {
		this.currentDateTime = (this.fillingTime.getUTCDate() < 10 ? '0' : '') + this.fillingTime.getUTCDate() +
			(this.fillingTime.getUTCHours() < 10 ? '0' : '') + this.fillingTime.getUTCHours() +
			(this.fillingTime.getUTCMinutes() < 10 ? '0' : '') + this.fillingTime.getUTCMinutes();
	}

	onChange(name) {
		for (let item of this.fileList) {
			if (name == item.name)
				this.draftMsg = item.message;
		}
	}

	//********** Get Address Indicator***********/
	getAddressIndicators(value) {
		this.serviceObject.setGetOperation(this.groupIndicatorUrl + "//" + value)
			.subscribe(data => {
				this.selectedAdressIndicators = data;
				console.log(this.selectedAdressIndicators);
			}),
			(ResponseError => {
				console.log(ResponseError._body);
				alert("Error: " + JSON.stringify(ResponseError._body));
			});
	}

	//****GetGroup Indicator */
	getGroupIndicator() {
		this.serviceObject.setGetOperation(this.groupIndicatorUrl)
			.subscribe(data => {
				this.groupIndicators = (data.gi);
			}),
			(ResponseError => {
				console.log(ResponseError._body);
				alert("Error: " + JSON.stringify(ResponseError._body));
			});
	}

	//*****When the user clicks the Group Indicator Save button,display the selected Address indiactor ********	
	submitGroupIndicator() {
		//this.hide('myModalGI');
		for (let obj of this.selectedAdressIndicators) {
			if (!this.validateAI.includes(obj) !== this.totalAI.has(obj)) {
				alert("vvveerruu");
				if (this.DI1 == null || this.DI1 == "") { this.DI1 = obj; continue }
				else if (this.DI2 == null || this.DI2 == "") { this.DI2 = obj; continue }
				else if (this.DI3 == null || this.DI3 == "") { this.DI3 = obj; continue }
				else if (this.DI4 == null || this.DI4 == "") { this.DI4 = obj; continue }
				else if (this.DI5 == null || this.DI15 == "") { this.DI5 = obj; continue }
				else if (this.DI6 == null || this.DI6 == "") { this.DI6 = obj; continue }
				else if (this.DI7 == null || this.DI7 == "") { this.DI7 = obj; continue }
				else if (this.DI8 == null || this.DI8 == "") { this.DI8 = obj; continue }
				else if (this.DI9 == null || this.DI9 == "") { this.DI9 = obj; continue }
				else if (this.DI10 == null || this.DI10 == "") { this.DI10 = obj; continue }
				else if (this.DI11 == null || this.DI11 == "") { this.DI11 = obj; continue }
				else if (this.DI12 == null || this.DI12 == "") { this.DI12 = obj; continue }
				else if (this.DI13 == null || this.DI13 == "") { this.DI13 = obj; continue }
				else if (this.DI14 == null || this.DI14 == "") { this.DI14 = obj; continue }
				else if (this.DI15 == null || this.DI15 == "") { this.DI15 = obj; continue }
				else if (this.DI16 == null || this.DI16 == "") { this.DI16 = obj; continue }
				else if (this.DI17 == null || this.DI17 == "") { this.DI17 = obj; continue }
				else if (this.DI18 == null || this.DI18 == "") { this.DI18 = obj; continue }
				else if (this.DI19 == null || this.DI19 == "") { this.DI19 = obj; continue }
				else if (this.DI20 == null || this.DI20 == "") { this.DI20 = obj; continue }
				else if (this.DI21 == null || this.DI21 == "") { this.DI21 = obj; continue }
				else { continue }
			}

			else { continue; }
		}
	}


	getDestinationIndicators() {
		this.validateAI = this.DI1 + " " + this.DI2 + " " + this.DI3 + " " + this.DI4 + " " + this.DI5 + " " + this.DI6 + " " + this.DI7 + "\n" +
			this.DI8 + " " + this.DI9 + " " + this.DI10 + " " + this.DI11 + " " + this.DI12 + " " + this.DI13 + " " + this.DI14 + "\n" +
			this.DI15 + " " + this.DI16 + " " + this.DI17 + " " + this.DI18 + " " + this.DI19 + " " + this.DI19 + " " + this.DI20 + " " + this.DI21;
		this.validateAI = this.validateAI.toLocaleUpperCase().trim();
		if (this.validateAI.length == 0) {
			alert("Please enter atleast one Address Indicator");
			return;
		}
		else {
			if (this.checkForKeyWords(this.validateAI)) {
				alert("Please verify Addres Indiactor may contain " + this.keyWords);
				return;
			}
			if (this.checkForKeyWords(this.OI23)) {
				alert("Please verify Origin Indiactor may contain " + this.keyWords);
				return;
			}
			else
				return this.validateAI;
		}
	}

	getcompleteAddressIndicators() {
		this.getDestinationIndicators();
		this.partitionedAI = [];
		this.partitionedAI.push(this.validateAI);
		var remstart = 0; var remstep = 21; var remend = remstart;
		var extraAI = "";
		var remtotal = Math.ceil(this.totalAI.size / remstep);
		for (let rotate = 1; rotate <= remtotal; rotate++) {
			rotate == remtotal ? remend = this.totalAI.size : remend = remend + remstep;
			for (; remstart < remend; remstart++) {
				if (remstart % 7 == 0)
					extraAI += "\n" + this.totalAI[remstart];
				else
					extraAI += " " + this.totalAI[remstart];
			}
			this.partitionedAI.push(extraAI);
			extraAI = "";
		}
	}

	checkForKeyWords(container) {
		var content = new String(container);
		for (let keyword of this.keyWords) {
			if (content.indexOf(keyword) != -1)
				return true;
		}
		return false;
	}

	print() {
		this.getMsgData();
		var popupWin = window.open('', '_blank');
		popupWin.document.open();
		popupWin.document.write('<html> <center><span style="font-size:12px;color:green"> </span></center><link rel="stylesheet" type="text/css" href="print.css" /> 	<body onload="window.print();window.close()"> <div class=" "  style="text-align:left;font-size:16px;rows:30px; cols:90px" >' + this.printData + '</div></body>');
		popupWin.document.write('</html>');
		popupWin.document.close();
	}

	getMsgData() {
		this.getcompleteAddressIndicators();
		this.sendMessage();
		if (this.partitionedAI.length > 0) {
			if (this.checkForKeyWords(this.draftMsg.toUpperCase())) {
				alert("Please verify the Message ,It may contain " + this.keyWords);
				return;
			}
			else {
				this.splitMessage(this.draftMsg.toUpperCase(), this.draftMsg.trim().length);
				return this.draftMsgParts;
			}
		}
		else {
			alert("Destination Indicators are null");
			return;
		}
	}

	getLatestSequenceNo() {
		this.serviceObject.setGetOperation(this.sequenceUrl)
			.subscribe(data => {
				this.sqnNo = data.sequenceNum;
				this.sequenceNo = Number(data.sequenceNum);
				console.log(data.sequenceNum);
				console.log(this.sqnNo);
			}),
			(ResponseError => {
				console.log(ResponseError._body);
				//alert("Error: "+JSON.stringify(ResponseError._body));
			});
	}

	splitMessage(draftMessage, msglength) {
		var start = 0; var step = 1000; var end = step; var result;
		this.total = Math.ceil(msglength / step);
		this.displayData = ""; this.printData = ""; var partMessage = "";
		this.getLatestSequenceNo();
		for (let splitAI of this.partitionedAI) {
			for (let part = 1; part <= this.total; part++) {
				result = draftMessage.substring(start, end);
				var headerPart1 = this.startMsgType + " " + this.channelPrefix + (this.sequenceNo < 10 ? '0' : '') + (this.sequenceNo < 100 ? '00' : '') + this.sequenceNo;
				var headerPart2 = this.priority + " " + splitAI;
				var headerPart3 = this.currentDateTime + " " + this.originIndicator;
				var headerPart4 = "// END PART 0" + (part == this.total ? (part + "/0" + part) : part) + " //";
				this.printData = this.printData + (headerPart1 + "<br>" + headerPart2 + "<br>" + headerPart3 + "<br>" + result + "<br><br><br><br><br>" + (this.total > 1 ? headerPart4 : '') + "<br><br>NNNN<br>").toUpperCase();
				partMessage = (headerPart1 + "\n" + headerPart2 + "\n" + headerPart3 + "\n" + result + "\n\n\n\n\n" + (this.total > 1 ? headerPart4 : '') + "\n\nNNNN\n").toUpperCase();
				this.draftMsgParts.push(partMessage);
				this.displayData = this.displayData + partMessage;
				start = end; end = end + step;
				this.sequenceNo = this.sequenceNo + 1;
			}
			start = 0; end = step;
		}
	}

	displayMessage() {
		this.getMsgData();
	}

	clear() {
		this.DI1 = ''; this.DI2 = ''; this.DI3 = ''; this.DI4 = ''; this.DI5 = ''; this.DI6 = ''; this.DI7 = '';
		this.DI8 = ''; this.DI9 = ''; this.DI10 = ''; this.DI11 = ''; this.DI12 = ''; this.DI13 = ''; this.DI14 = '';
		this.DI15 = ''; this.DI16 = ''; this.DI17 = ''; this.DI18 = ''; this.DI19 = ''; this.DI20 = ''; this.DI21 = '';
		this.draftName = ''; this.draftMsg = ''; this.totalAI.clear(); this.tabclear();
	}

	tabclear() {
		this.aftnMessage = ''; this.FPLAircraftID = ''; this.FPLSSRMode = ''; this.FPLSSRCode = '';
		this.FPLFlightRules = ''; this.FPLTypeOfFlight = ''; this.FPLAirCraftNo = ''; this.FPLAirCraftType = '';
		this.FPLWakeTurbulenceCat = ''; this.FPLSurEquip = ''; this.FPLRadEquip = ''; this.FPLDepAerodrome = '';
		this.FPLCruisingSpeed = ''; this.FPLCruisingLevel = ''; this.routeMessage = ''; this.FPLDSTAerodrome = '';
		this.FPL1stAltAerodrome = ''; this.FPL2ndAltAerodrome = ''; this.otherInfoMessage = ''; this.CHGAircraftID = '';
		this.CHGSSRMode = ''; this.CHGSSRCode = ''; this.CHGDepAerodrome = ''; this.CHGDSTAerodrome = '';
		this.CHG1stAltAerodrome = ''; this.CHG2ndAltAerodrome = ''; this.Fieldlocation = ''; this.FieldsAmendment = '';
		this.CNLAircraftID = ''; this.CNLSSRMode = ''; this.CNLSSRCode = ''; this.CNLDepAerodrome = '';
		this.CNLDSTAerodrome = ''; this.CNL1stAltAerodrome = ''; this.CNL2ndAltAerodrome = ''; this.otherInfoMessage = '';
		this.DLAAircraftID = ''; this.DLASSRMode = ''; this.DLASSRCode = ''; this.DLADepAerodrome = '';
		this.DLADSTAerodrome = ''; this.DLA1stAltAerodrome = ''; this.DLA2ndAltAerodrome = ''; this.otherInfoMessage = '';
		this.DEPAircraftID = ''; this.DEPSSRMode = ''; this.DEPSSRCode = ''; this.DEPDepAerodrome = '';
		this.DEPDSTAerodrome = ''; this.DEP1stAltAerodrome = ''; this.DEP2ndAltAerodrome = ''; this.otherInfoMessage = '';
		this.ARRAircraftID = ''; this.ARRSSRMode = ''; this.ARRSSRCode = ''; this.ARRDepAerodrome = '';
		this.ARRAerodrome = ''; this.ARRTime = ''; this.CPLAircraftID = ''; this.CPLSSRMode = '';
		this.CPLSSRCode = ''; this.CPLFlightRules = ''; this.CPLTypeOfFlight = ''; this.CPLAirCraftNo = '';
		this.CPLAirCraftType = ''; this.CPLWakeTurbulenceCat = ''; this.CPLSurEquip = ''; this.CPLRadEquip = '';
		this.CPLDepAerodrome = ''; this.CPLCruisingSpeed = ''; this.CPLCruisingLevel = ''; this.routeMessage = '';
		this.CPLDSTAerodrome = ''; this.CPL1stAltAerodrome = ''; this.CPL2ndAltAerodrome = ''; this.otherInfoMessage = '';
		this.ESTAircraftID = ''; this.ESTSSRMode = ''; this.ESTSSRCode = ''; this.ESTDepAerodrome = '';
		this.ESTBoundarypoint = ''; this.ESTTimeatBP = ''; this.ESTClearLevel = ''; this.ESTSCData = '';
		this.ESTSCCondition = ''; this.ESTDSTAerodrome = ''; this.EST1stAltAerodrome = ''; this.EST2ndAltAerodrome = '';
		this.CDNAircraftID = ''; this.CDNSSRMode = ''; this.CDNSSRCode = ''; this.CDNDepAerodrome = '';
		this.CDNDSTAerodrome = ''; this.CDN1stAltAerodrome = ''; this.CDN2ndAltAerodrome = ''; this.Fieldlocation = '';
		this.FieldsAmendment = ''; this.ACPAircraftID = ''; this.ACPSSRMode = ''; this.ACPSSRCode = '';
		this.ACPDepAerodrome = ''; this.ACPDSTAerodrome = ''; this.ACP1stAltAerodrome = ''; this.ACP2ndAltAerodrome = '';
		this.RQPAircraftID = ''; this.RQPSSRMode = ''; this.RQPSSRCode = ''; this.RQPDepAerodrome = '';
		this.RQPDSTAerodrome = ''; this.RQP1stAltAerodrome = ''; this.RQP2ndAltAerodrome = ''; this.RQSAircraftID = '';
		this.RQSSSRMode = ''; this.RQSSSRCode = ''; this.RQSDepAerodrome = ''; this.RQSDSTAerodrome = '';
		this.RQS1stAltAerodrome = ''; this.RQS2ndAltAerodrome = ''; this.SPLAircraftID = ''; this.SPLSSRMode = '';
		this.SPLSSRCode = ''; this.SPLDepAerodrome = ''; this.SPLDSTAerodrome = ''; this.SPL1stAltAerodrome = '';
		this.SPL2ndAltAerodrome = ''; this.otherInfoMessage = ''; this.otherInfoMessage2 = ''; this.ALRAircraftID = '';
		this.ALRSSRMode = ''; this.ALRSSRCode = ''; this.ALRDepAerodrome = ''; this.otherInfoMessage = '';
		this.RCFAircraftID = ''; this.RCFSSRMode = ''; this.RCFSSRCode = ''; this.RCFDepAerodrome = ''; this.otherInfoMessage = '';
		this.helpInfoMessage = ''; this.displayData = ''; this.helpInfoMessage1 = '';
	}
	listClick(newValue) {
		this.selectedItem = newValue;
		this.tabclear();
	}

	submit() {
		if (this.getMsgData() != null) {
			for (let i = 0; i < this.draftMsgParts.length; i++) {
				this.serviceObject.setPostOperation(this.messageurl, this.draftMsgParts[i])
					.subscribe(data => {
						this.responseText = data.response;
						////alert(data.response);
						console.log(data.response);
						this.clear();
					}),
					(ResponseError => {
						console.log(ResponseError._body);
						//alert("Error: "+JSON.stringify(ResponseError._body));
					});
			}
		}
		else {
			return;
		}
	}
	add(){
		
		/*
			var data = document.getElementById('add').value;
			document.getElementById('get').innerHTML += data + "<br/>";*/
		
		
		//  this.k += this.CHGFieldType + " ";
		//  this.CHGFieldType1 = this.k;
		
		this.CHGFieldType1 += this.CHGFieldType + " ";
		 //this.clear();
		
		}

		emptyHelpDisplay()
		{
			this.helpInfoMessage = "";
			this.helpMessageHeader = "";
		}


	sendMessage() {
		switch (this.selectedItem) {
			case 'AFTN': { this.draftMsg = this.selectedItem + "-" + this.aftnMessage; break; }
			case 'FPL': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.FPLAircraftID + "/" + this.FPLSSRMode + "-" + this.FPLSSRCode + "-" + this.FPLFlightRules + "" +
					this.FPLTypeOfFlight + "" + this.FPLAirCraftNo + "-" + this.FPLAirCraftType + " " + this.FPLWakeTurbulenceCat + " " +
					this.FPLSurEquip + " " + this.FPLRadEquip + "-" + this.FPLDepAerodrome + "-" + this.FPLCruisingSpeed + " " + this.FPLCruisingLevel + " " +
					this.routeMessage + "-" + this.FPLDSTAerodrome + " " + this.FPL1stAltAerodrome + " " + this.FPL2ndAltAerodrome + "-" +
					this.otherInfoMessage + ")";
				break;
			}
			case 'CHG': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.CHGAircraftID + "/" + this.CHGSSRMode + "-" + this.CHGSSRCode + "-" + this.CHGDepAerodrome + "-" +
					this.CHGDSTAerodrome + " " + this.CHG1stAltAerodrome + " " + this.CHG2ndAltAerodrome + "-" + this.routeMessage + "-" + this.Fieldlocation + " " +
					this.FieldsAmendment + ")";
				break;
			}
			case 'CNL': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.CNLAircraftID + "/" + this.CNLSSRMode + "-" + this.CNLSSRCode + "-" + this.CNLDepAerodrome + "-" +
					this.CNLDSTAerodrome + " " + this.CNL1stAltAerodrome + " " + this.CNL2ndAltAerodrome + "-" + this.routeMessage + "-" + ")";
				break;
			}
			case 'DLA': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.DLAAircraftID + "/" + this.DLASSRMode + "-" + this.DLASSRCode + "-" + this.DLADepAerodrome + "-" +
					this.DLADSTAerodrome + " " + this.DLA1stAltAerodrome + " " + this.DLA2ndAltAerodrome + "-" + this.routeMessage + "-" + ")";
				break;
			}
			case 'DEP': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.DEPAircraftID + "/" + this.DEPSSRMode + "-" + this.DEPSSRCode + "-" + this.DEPDepAerodrome + "-" +
					this.DEPDSTAerodrome + " " + this.DEP1stAltAerodrome + " " + this.DEP2ndAltAerodrome + "-" + this.routeMessage + "-" + ")";
				break;
			}
			case 'ARR': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.ARRAircraftID + "/" + this.ARRSSRMode + "-" + this.ARRSSRCode + "-" + this.ARRDepAerodrome + "-" +
					this.ARRAerodrome + " " + this.ARRTime + " " + this.ARRArrivalAerodrome + ")";
				break;
			}
			case 'CPL': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.CPLAircraftID + "/" + this.CPLSSRMode + "-" + this.CPLSSRCode + "-" + this.CPLFlightRules + "" +
					this.CPLTypeOfFlight + "" + this.CPLAirCraftNo + "-" + this.CPLAirCraftType + " " + this.CPLWakeTurbulenceCat + " " +
					this.CPLSurEquip + " " + this.CPLRadEquip + "-" + this.CPLDepAerodrome + "-" + this.CPLCruisingSpeed + " " + this.CPLCruisingLevel + " " +
					this.routeMessage + "-" + this.CPLDSTAerodrome + " " + this.CPL1stAltAerodrome + " " + this.CPL2ndAltAerodrome + "-" +
					this.otherInfoMessage + ")";
				break;
			}
			case 'EST': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.ESTAircraftID + "/" + this.ESTSSRMode + "-" + this.ESTSSRCode + "-" + this.ESTDepAerodrome + "-" +
					this.ESTBoundarypoint + "/" + this.ESTTimeatBP + " " + this.ESTClearLevel + " " + this.ESTSCData + " " + this.ESTSCCondition + " " + this.ESTDSTAerodrome + " " + this.EST1stAltAerodrome + " " + this.EST2ndAltAerodrome + "-" + ")";
				break;
			}
			case 'CDN': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.CDNAircraftID + "/" + this.CDNSSRMode + "-" + this.CDNSSRCode + "-" + this.CDNDepAerodrome + "-" +
					this.CDNDSTAerodrome + " " + this.CDN1stAltAerodrome + " " + this.CDN2ndAltAerodrome + "-" + this.Fieldlocation + "-" + this.FieldsAmendment + ")";
				break;
			}
			case 'ACP': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.ACPAircraftID + "/" + this.ACPSSRMode + "-" + this.ACPSSRCode + "-" + this.ACPDepAerodrome + "-" +
					this.ACPDSTAerodrome + " " + this.ACP1stAltAerodrome + " " + this.ACP2ndAltAerodrome + ")";
				break;
			}
			case 'RQP': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.RQPAircraftID + "/" + this.RQPSSRMode + "-" + this.RQPSSRCode + "-" + this.RQPDepAerodrome + "-" +
					this.RQPDSTAerodrome + " " + this.RQP1stAltAerodrome + " " + this.RQP2ndAltAerodrome + ")";
				break;
			}
			case 'RQS': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.RQSAircraftID + "/" + this.RQSSSRMode + "-" + this.RQSSSRCode + "-" + this.RQSDepAerodrome + "-" +
					this.RQSDSTAerodrome + " " + this.RQS1stAltAerodrome + " " + this.RQS2ndAltAerodrome + ")";
				break;
			}
			case 'SPL': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.SPLAircraftID + "/" + this.SPLSSRMode + "-" + this.SPLSSRCode + "-" + this.SPLDepAerodrome + "-" +
					this.SPLDSTAerodrome + " " + this.SPL1stAltAerodrome + " " + this.SPL2ndAltAerodrome + "-" + this.otherInfoMessage + "-" + this.otherInfoMessage2 + ")";
				break;
			}
			case 'ALR': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.ALRAircraftID + "/" + this.ALRSSRMode + "-" + this.ALRSSRCode + "-" + this.ALRDepAerodrome + "-" +
					this.otherInfoMessage + ")";
				break;
			}
			case 'RCF': {
				this.draftMsg = "( " + this.selectedItem + "-" + this.RCFAircraftID + "/" + this.RCFSSRMode + "-" + this.RCFSSRCode + "-" + this.RCFDepAerodrome + "-" +
					this.otherInfoMessage + ")";
				break;
			}
			default: { this.draftMsg = ""; break; }
		}
	}


	selectedItem: string = '';
	helpMessageHeader: string = '';

	tabGroup: any[] = [{ name: 'AFTN' }, { name: 'FPL' }, { name: 'CHG' }, { name: 'CNL' }, { name: 'DLA' },
	{ name: 'DEP' }, { name: 'ARR' }, { name: 'CPL' }, { name: 'EST' }, { name: 'CDN' }, { name: 'ACP' },
	{ name: 'RQP' }, { name: 'RQS' }, { name: 'SPL' }, { name: 'ALR' }, { name: 'RCF' }];

	aftnMessage: any = ''; FPLAircraftID: any = ''; FPLSSRMode: any = ''; FPLSSRCode: any = ''; FPLFlightRules: any = ''; FPLTypeOfFlight: any = '';
	FPLAirCraftNo: any = ''; FPLAirCraftType: any = ''; FPLWakeTurbulenceCat: any = ''; FPLSurEquip: any = ''; FPLRadEquip: any = '';
	FPLDepAerodrome: any = ''; FPLCruisingSpeed: any = ''; FPLCruisingLevel: any = ''; routeMessage: any = ''; FPLDSTAerodrome: any = '';
	FPL1stAltAerodrome: any = ''; FPL2ndAltAerodrome: any = ''; otherInfoMessage: any = ''; CHGAircraftID: any = ''; CHGSSRMode: any = '';
	CHGSSRCode: any = ''; CHGDepAerodrome: any = ''; CHGDSTAerodrome: any = ''; CHG1stAltAerodrome: any = ''; CHG2ndAltAerodrome: any = '';
	Fieldlocation: any = ''; FieldsAmendment: any = ''; CNLAircraftID: any = ''; CNLSSRMode: any = ''; CNLSSRCode: any = '';
	CNLDepAerodrome: any = ''; CNLDSTAerodrome: any = ''; CNL1stAltAerodrome: any = ''; CNL2ndAltAerodrome: any = ''; DLAAircraftID: any = '';
	DLASSRMode: any = ''; DLASSRCode: any = ''; DLADepAerodrome: any = ''; DLADSTAerodrome: any = ''; DLA1stAltAerodrome: any = '';
	DLA2ndAltAerodrome: any = ''; DEPAircraftID: any = ''; DEPSSRMode: any = ''; DEPSSRCode: any = ''; DEPDepAerodrome: any = '';
	DEPDSTAerodrome: any = ''; DEP1stAltAerodrome: any = ''; DEP2ndAltAerodrome: any = ''; ARRAircraftID: any = ''; ARRSSRMode: any = '';
	ARRSSRCode: any = ''; ARRDepAerodrome: any = ''; ARRAerodrome: any = ''; ARRTime: any = ''; ARRArrivalAerodrome: any = '';
	CPLAircraftID: any = ''; CPLSSRMode: any = ''; CPLSSRCode: any = ''; CPLFlightRules: any = ''; CPLTypeOfFlight: any = '';
	CPLAirCraftNo: any = ''; CPLAirCraftType: any = ''; CPLWakeTurbulenceCat: any = ''; CPLSurEquip: any = ''; CPLRadEquip: any = '';
	CPLDepAerodrome: any = ''; CPLCruisingSpeed: any = ''; CPLCruisingLevel: any = ''; CPLDSTAerodrome: any = ''; CPL1stAltAerodrome: any = '';
	CPL2ndAltAerodrome: any = ''; ESTAircraftID: any = ''; ESTSSRMode: any = ''; ESTSSRCode: any = ''; ESTDepAerodrome: any = '';
	ESTBoundarypoint: any = ''; ESTTimeatBP: any = ''; ESTClearLevel: any = ''; ESTSCData: any = ''; ESTSCCondition: any = '';
	ESTDSTAerodrome: any = ''; EST1stAltAerodrome: any = ''; EST2ndAltAerodrome: any = ''; CDNAircraftID: any = ''; CDNSSRMode: any = '';
	CDNSSRCode: any = ''; CDNDepAerodrome: any = ''; CDNDSTAerodrome: any = ''; CDN1stAltAerodrome: any = ''; CDN2ndAltAerodrome: any = '';
	ACPAircraftID: any = ''; ACPSSRMode: any = ''; ACPSSRCode: any = ''; ACPDepAerodrome: any = ''; ACPDSTAerodrome: any = '';
	ACP1stAltAerodrome: any = ''; ACP2ndAltAerodrome: any = ''; RQPAircraftID: any = ''; RQPSSRMode: any = ''; RQPSSRCode: any = '';
	RQPDepAerodrome: any = ''; RQPDSTAerodrome: any = ''; RQP1stAltAerodrome: any = ''; RQP2ndAltAerodrome: any = ''; RQSAircraftID: any = '';
	RQSSSRMode: any = ''; RQSSSRCode: any = ''; RQSDepAerodrome: any = ''; RQSDSTAerodrome: any = ''; RQS1stAltAerodrome: any = '';
	RQS2ndAltAerodrome: any = ''; SPLAircraftID: any = ''; SPLSSRMode: any = ''; SPLSSRCode: any = ''; SPLDepAerodrome: any = '';
	SPLDSTAerodrome: any = ''; SPL1stAltAerodrome: any = ''; SPL2ndAltAerodrome: any = ''; otherInfoMessage2: any = ''; ALRAircraftID: any = '';
	ALRSSRMode: any = ''; ALRSSRCode: any = ''; ALRDepAerodrome: any = ''; RCFAircraftID: any = ''; RCFSSRMode: any = ''; RCFSSRCode: any = '';
	RCFDepAerodrome: any = ''; helpInfoMessage: any = ''; helpInfoMessage1: any = '';

	helpInformation: Array<any> = [
		// {name : 'FPLAircraftID' , value :"Aircraft id  :-   NOT MORE THAN 7 CHARACTERS, being the aircraft identification shown in the filed flight plan and composed as specified in Appendix 2, Section 2."},
		// {name : 'FPLAircraftID' , value : "Aircraft id       :- NOT MORE THAN 7 CHARACTERS, being the aircraft identification shown in the filed flight plan and composed as specified in Appendix 2, Section 2."},
		// { name : 'FPLSSRMode',  value :  "SSR mode       :-  LETTER A giving the SSR mode related to (c)."},
		// { name : 'FPLSSRMode',  value :  "SSR mode       :-  LETTER A giving the SSR mode related to (c)."},
		// { name : 'FPLSSRCode',  value :  "SSR code       :-  4 NUMERICS giving the SSR code assigned to the aircraft by ATS and transmitted in the mode given in (b)."},
		// { name : 'FPLFlightRules',  value :  "Flight rules      :- 1 LETTER as follows:I if it is intended that the entire flight will be operated under the IFR V if it is intended that the entire flight will be operated under the VFR Y if the flight initially will be operated under the IFR, followed by one or more subsequent changes of flight rules Z if the flight initially will be operated under the VFR, followed by one or more subsequent changes of flight rules Note.— If the letter Y or Z is used, the point or points at which a change of flight rules is planned is to be shown as indicated in Field Type 15."},
		// { name : 'FPLTypeOfFlight',  value :  "Typeof flight      :- 1 LETTER as follows:S if scheduled air transport N if non-scheduled air transport G if general aviation M if military X other flights"},
		// { name : 'FPLAirCraftNo',  value :  "aircraft no. :- Note.— This element is included only in the case of formation flights. 1 OR 2 NUMERICS giving the number of aircraft in the flight."},
		// { name : 'FPLAircraftType',  value :  "aircraft Type :-2 to 4 CHARACTERS, being the appropriate designator chosen from ICAO Doc 8643, Aircraft Type Designators, or ZZZZ if no designator has been assigned or if there is more than one type of aircraft in the flight.Note.— If the letters ZZZZ are used, the type(s) of aircraft is (are) to be shown in the Other Information Field (see Field Type 18)."},
		// { name : 'FPLWakeTurbulenceCat',  value :  "Wake turb cat :- 1 LETTER to indicate maximum certificated take-off mass of the aircraft: H — Heavy M — Medium	L — Light"},
		// { name : 'FPLSurEquip',  value : "SSR mode   :-      LETTER A giving the SSR mode related to (c)."},
		// { name : 'FPLRadEquip',  value : "SSR mode   :-      LETTER A giving the SSR mode related to (c)."},
		// { name : 'FPLDepAerodrome',  value : "Dep.aerodrome   :- 4 LETTERS, being the ICAO four-letter location indicator allocated to the departure aerodrome, as specified in Doc 7910, Location Indicators, or ZZZZ if no ICAO location indicator has been allocated (see Note 1) or if the departure aerodrome is not known, or AFIL if the flight plan has been filed in the air (see Note 2). Note 1.— If ZZZZ is used, the name and location of the departure aerodrome is to be shown in the Other Information Field (see Field Type 18) if this Field Type is contained in the message. Note 2.— If AFIL is used, the ATS unit from which supplementary flight data can be obtained is to be shown in the Other Information Field (Field Type 18)."},
		// { name : 'FPLCruisingSpeed',  value : "SSR mode   :-    LETTER A giving the SSR mode related to (c)."},
		// { name : 'FPLCruisingLevel',  value : "SSR mode   :-      LETTER A giving the SSR mode related to (c)."},
		// { name : 'Route2',  value : "SSR mode   :-              LETTER A giving the SSR mode related to (c)."},
		// { name : 'FPLDSTAerodrome',  value : "Dest.aerodrome :-    4 LETTERS, being the ICAO four-letter location indicator allocated to the destination aerodrome, as specified in Doc 7910, Location Indicators, or ZZZZ if no ICAO location indicator has been allocated. Note.— If ZZZZ is used, the name and location of the destination aerodrome is to be shown in the Other Information Field (see Field Type 18)."},
		// { name : 'FPL1stAltAerodrome',  value : "1st alt aerodrome(s) Note.— One further element of (c) should be added, as necessary, preceded by a space. 4 LETTERS, being the ICAO four-letter location indicator allocated to an alternate aerodrome, as specified in Doc 7910, Location Indicators, or ZZZZ if no ICAO location indicator has been allocated. Note.— If ZZZZ is used, the name and location of the destination alternate aerodrome is to be shown in the Other Information Field (see Field Type 18)."},
		// { name : 'FPL2ndAltAerodrome',  value : "2nd alt aerodrome(s) Note.— One further element of (c) should be added, as necessary, preceded by a space. 4 LETTERS, being the ICAO four-letter location indicator allocated to an alternate aerodrome, as specified in Doc 7910, Location Indicators, or ZZZZ if no ICAO location indicator has been allocated. Note.— If ZZZZ is used, the name and location of the destination alternate aerodrome is to be shown in the Other Information Field (see Field Type 18)."},
		// { name : 'otherInfoMessage',  value : "other Info.Msg    :-       0 (zero) if no other information OR"}
		{ name: 'FPLAircraftID', value1: "Aircraft id", value: "NOT MORE THAN 7 CHARACTERS, being the aircraft identification shown in the filed flight plan and composed as specified in Appendix 2, Section 2." },
		{ name: 'FPLAircraftID', value1: "Aircraft id", value: "NOT MORE THAN 7 CHARACTERS, being the aircraft identification shown in the filed flight plan and composed as specified in Appendix 2, Section 2." },
		{ name: 'FPLSSRMode', value1: "SSR mode", value: "LETTER A giving the SSR mode related to (c)." },
		{ name: 'FPLSSRMode', value1: "SSR mode", value: "LETTER A giving the SSR mode related to (c)." },
		{ name: 'FPLSSRCode', value1: "SSR code", value: "4 NUMERICS giving the SSR code assigned to the aircraft by ATS and transmitted in the mode given in (b)." },
		{ name: 'FPLFlightRules', value1: "Flight rules", value: "1 LETTER as follows:I if it is intended that the entire flight will be operated under the IFR V if it is intended that the entire flight will be operated under the VFR Y if the flight initially will be operated under the IFR, followed by one or more subsequent changes of flight rules Z if the flight initially will be operated under the VFR, followed by one or more subsequent changes of flight rules Note.— If the letter Y or Z is used, the point or points at which a change of flight rules is planned is to be shown as indicated in Field Type 15." },
		{ name: 'FPLTypeOfFlight', value1: "Typeof flight", value: "1 LETTER as follows:S if scheduled air transport N if non-scheduled air transport G if general aviation M if military X other flights" },
		{ name: 'FPLAirCraftNo', value1: "aircraft no.", value: "This element is included only in the case of formation flights. 1 OR 2 NUMERICS giving the number of aircraft in the flight." },
		{ name: 'FPLAircraftType', value1: "aircraft Type", value: "2 to 4 CHARACTERS, being the appropriate designator chosen from ICAO Doc 8643, Aircraft Type Designators, or ZZZZ if no designator has been assigned or if there is more than one type of aircraft in the flight.Note.— If the letters ZZZZ are used, the type(s) of aircraft is (are) to be shown in the Other Information Field (see Field Type 18)." },
		{ name: 'FPLWakeTurbulenceCat', value1: "Wake turb cat", value: "1 LETTER to indicate maximum certificated take-off mass of the aircraft: H — Heavy M — Medium	L — Light" },
		{ name: 'FPLSurEquip', value1: "SSR mode", value: "LETTER A giving the SSR mode related to (c)." },
		{ name: 'FPLRadEquip', value1: "SSR mode", value: "LETTER A giving the SSR mode related to (c)." },
		{ name: 'FPLDepAerodrome', value1: "Dep.aerodrome", value: "4 LETTERS, being the ICAO four-letter location indicator allocated to the departure aerodrome, as specified in Doc 7910, Location Indicators, or ZZZZ if no ICAO location indicator has been allocated (see Note 1) or if the departure aerodrome is not known, or AFIL if the flight plan has been filed in the air (see Note 2). Note 1.— If ZZZZ is used, the name and location of the departure aerodrome is to be shown in the Other Information Field (see Field Type 18) if this Field Type is contained in the message. Note 2.— If AFIL is used, the ATS unit from which supplementary flight data can be obtained is to be shown in the Other Information Field (Field Type 18)." },
		{ name: 'FPLCruisingSpeed', value1: "SSR mode", value: "LETTER A giving the SSR mode related to (c)." },
		{ name: 'FPLCruisingLevel', value1: "SSR mode", value: "LETTER A giving the SSR mode related to (c)." },
		{ name: 'Route2', value1: "SSR mode", value: "LETTER A giving the SSR mode related to (c)." },
		{ name: 'FPLDSTAerodrome', value1: "Dest.aerodrome", value: "4 LETTERS, being the ICAO four-letter location indicator allocated to the destination aerodrome, as specified in Doc 7910, Location Indicators, or ZZZZ if no ICAO location indicator has been allocated. Note.— If ZZZZ is used, the name and location of the destination aerodrome is to be shown in the Other Information Field (see Field Type 18)." },
		{ name: 'FPL1stAltAerodrome', value1: "1st alt aerodrome(s)", value: "Note.— One further element of (c) should be added, as necessary, preceded by a space. 4 LETTERS, being the ICAO four-letter location indicator allocated to an alternate aerodrome, as specified in Doc 7910, Location Indicators, or ZZZZ if no ICAO location indicator has been allocated. Note.— If ZZZZ is used, the name and location of the destination alternate aerodrome is to be shown in the Other Information Field (see Field Type 18)." },
		{ name: 'FPL2ndAltAerodrome', value1: "2nd alt aerodrome(s)", value: "Note.— One further element of (c) should be added, as necessary, preceded by a space. 4 LETTERS, being the ICAO four-letter location indicator allocated to an alternate aerodrome, as specified in Doc 7910, Location Indicators, or ZZZZ if no ICAO location indicator has been allocated. Note.— If ZZZZ is used, the name and location of the destination alternate aerodrome is to be shown in the Other Information Field (see Field Type 18)." },
		{ name: 'otherInfoMessage', value1: "other Info.Msg", value: "other Info.Msg    :-       0 (zero) if no other information OR" }

	]

	helpDisplay(textBoxName) {
		let selectedItem: any = this.helpInformation.find((item: any) => item.name == textBoxName);
		this.helpInfoMessage = selectedItem.value;
		this.helpMessageHeader = selectedItem.value1;
		//this.helpInfoMessage1=selectedItem.value;
	}
	// 	 helpDisplay1(textBoxName)
	//    {
	// 	let selectedItem :any = this.helpInformation.find((item:any)=> item.name == textBoxName);
	//     this.helpInfoMessage1 = selectedItem.value1;
	//   }
	// emptyHelpDisplay(value)
	// {
	// 	alert(value);
	// 	this.outfocusvalue = value;
	// 	this.getDestinationIndicators();		
	// }
}
