"use strict";(globalThis.webpackChunkionic_app_base=globalThis.webpackChunkionic_app_base||[]).push([[665],{665:(e,t,i)=>{i.r(t),i.d(t,{BluetoothLeWeb:()=>n});var a=i(653),s=i(789);class n extends a.Uw{constructor(){super(...arguments),this.deviceMap=new Map,this.discoveredDevices=new Map,this.scan=null,this.DEFAULT_CONNECTION_TIMEOUT=1e4,this.onAdvertisementReceivedCallback=this.onAdvertisementReceived.bind(this),this.onDisconnectedCallback=this.onDisconnected.bind(this),this.onCharacteristicValueChangedCallback=this.onCharacteristicValueChanged.bind(this)}async initialize(){if("undefined"===typeof navigator||!navigator.bluetooth)throw this.unavailable("Web Bluetooth API not available in this browser.");if(!await navigator.bluetooth.getAvailability())throw this.unavailable("No Bluetooth radio available.")}async isEnabled(){return{value:!0}}async enable(){throw this.unavailable("enable is not available on web.")}async disable(){throw this.unavailable("disable is not available on web.")}async startEnabledNotifications(){}async stopEnabledNotifications(){}async isLocationEnabled(){throw this.unavailable("isLocationEnabled is not available on web.")}async openLocationSettings(){throw this.unavailable("openLocationSettings is not available on web.")}async openBluetoothSettings(){throw this.unavailable("openBluetoothSettings is not available on web.")}async openAppSettings(){throw this.unavailable("openAppSettings is not available on web.")}async setDisplayStrings(){}async requestDevice(e){const t=this.getFilters(e),i=await navigator.bluetooth.requestDevice({filters:t.length?t:void 0,optionalServices:null===e||void 0===e?void 0:e.optionalServices,acceptAllDevices:0===t.length});this.deviceMap.set(i.id,i);return this.getBleDevice(i)}async requestLEScan(e){this.requestBleDeviceOptions=e;const t=this.getFilters(e);await this.stopLEScan(),this.discoveredDevices=new Map,navigator.bluetooth.removeEventListener("advertisementreceived",this.onAdvertisementReceivedCallback),navigator.bluetooth.addEventListener("advertisementreceived",this.onAdvertisementReceivedCallback),this.scan=await navigator.bluetooth.requestLEScan({filters:t.length?t:void 0,acceptAllAdvertisements:0===t.length,keepRepeatedDevices:null===e||void 0===e?void 0:e.allowDuplicates})}onAdvertisementReceived(e){var t,i;const a=e.device.id;this.deviceMap.set(a,e.device);if(!this.discoveredDevices.has(a)||(null===(t=this.requestBleDeviceOptions)||void 0===t?void 0:t.allowDuplicates)){this.discoveredDevices.set(a,!0);const t=this.getBleDevice(e.device),n={device:t,localName:t.name,rssi:e.rssi,txPower:e.txPower,manufacturerData:(0,s.GA)(e.manufacturerData),serviceData:(0,s.GA)(e.serviceData),uuids:null===(i=e.uuids)||void 0===i?void 0:i.map(s.JA)};this.notifyListeners("onScanResult",n)}}async stopLEScan(){var e;(null===(e=this.scan)||void 0===e?void 0:e.active)&&this.scan.stop(),this.scan=null}async getDevices(e){return{devices:(await navigator.bluetooth.getDevices()).filter((t=>e.deviceIds.includes(t.id))).map((e=>{this.deviceMap.set(e.id,e);return this.getBleDevice(e)}))}}async getConnectedDevices(e){return{devices:(await navigator.bluetooth.getDevices()).filter((e=>{var t;return null===(t=e.gatt)||void 0===t?void 0:t.connected})).map((e=>{this.deviceMap.set(e.id,e);return this.getBleDevice(e)}))}}async connect(e){var t,i;const a=this.getDeviceFromMap(e.deviceId);a.removeEventListener("gattserverdisconnected",this.onDisconnectedCallback),a.addEventListener("gattserverdisconnected",this.onDisconnectedCallback);const s=Symbol();if(void 0===a.gatt)throw new Error("No gatt server available.");try{const i=null!==(t=e.timeout)&&void 0!==t?t:this.DEFAULT_CONNECTION_TIMEOUT;await async function(e,t,i){let a;return Promise.race([e,new Promise(((e,s)=>{a=setTimeout((()=>s(i)),t)}))]).finally((()=>clearTimeout(a)))}(a.gatt.connect(),i,s)}catch(n){throw await(null===(i=a.gatt)||void 0===i?void 0:i.disconnect()),n===s?new Error("Connection timeout"):n}}onDisconnected(e){const t=`disconnected|${e.target.id}`;this.notifyListeners(t,null)}async createBond(e){throw this.unavailable("createBond is not available on web.")}async isBonded(e){throw this.unavailable("isBonded is not available on web.")}async disconnect(e){var t;null===(t=this.getDeviceFromMap(e.deviceId).gatt)||void 0===t||t.disconnect()}async getServices(e){var t,i;const a=null!==(i=await(null===(t=this.getDeviceFromMap(e.deviceId).gatt)||void 0===t?void 0:t.getPrimaryServices()))&&void 0!==i?i:[],s=[];for(const n of a){const e=await n.getCharacteristics(),t=[];for(const i of e)t.push({uuid:i.uuid,properties:this.getProperties(i),descriptors:await this.getDescriptors(i)});s.push({uuid:n.uuid,characteristics:t})}return{services:s}}async getDescriptors(e){try{return(await e.getDescriptors()).map((e=>({uuid:e.uuid})))}catch(t){return[]}}getProperties(e){return{broadcast:e.properties.broadcast,read:e.properties.read,writeWithoutResponse:e.properties.writeWithoutResponse,write:e.properties.write,notify:e.properties.notify,indicate:e.properties.indicate,authenticatedSignedWrites:e.properties.authenticatedSignedWrites,reliableWrite:e.properties.reliableWrite,writableAuxiliaries:e.properties.writableAuxiliaries}}async getCharacteristic(e){var t;const i=await(null===(t=this.getDeviceFromMap(e.deviceId).gatt)||void 0===t?void 0:t.getPrimaryService(null===e||void 0===e?void 0:e.service));return null===i||void 0===i?void 0:i.getCharacteristic(null===e||void 0===e?void 0:e.characteristic)}async getDescriptor(e){const t=await this.getCharacteristic(e);return null===t||void 0===t?void 0:t.getDescriptor(null===e||void 0===e?void 0:e.descriptor)}async discoverServices(e){throw this.unavailable("discoverServices is not available on web.")}async getMtu(e){throw this.unavailable("getMtu is not available on web.")}async requestConnectionPriority(e){throw this.unavailable("requestConnectionPriority is not available on web.")}async readRssi(e){throw this.unavailable("readRssi is not available on web.")}async read(e){const t=await this.getCharacteristic(e);return{value:await(null===t||void 0===t?void 0:t.readValue())}}async write(e){const t=await this.getCharacteristic(e);let i;i="string"===typeof e.value?(0,s._j)(e.value):e.value,await(null===t||void 0===t?void 0:t.writeValueWithResponse(i))}async writeWithoutResponse(e){const t=await this.getCharacteristic(e);let i;i="string"===typeof e.value?(0,s._j)(e.value):e.value,await(null===t||void 0===t?void 0:t.writeValueWithoutResponse(i))}async readDescriptor(e){const t=await this.getDescriptor(e);return{value:await(null===t||void 0===t?void 0:t.readValue())}}async writeDescriptor(e){const t=await this.getDescriptor(e);let i;i="string"===typeof e.value?(0,s._j)(e.value):e.value,await(null===t||void 0===t?void 0:t.writeValue(i))}async startNotifications(e){const t=await this.getCharacteristic(e);null===t||void 0===t||t.removeEventListener("characteristicvaluechanged",this.onCharacteristicValueChangedCallback),null===t||void 0===t||t.addEventListener("characteristicvaluechanged",this.onCharacteristicValueChangedCallback),await(null===t||void 0===t?void 0:t.startNotifications())}onCharacteristicValueChanged(e){var t,i;const a=e.target,s=`notification|${null===(t=a.service)||void 0===t?void 0:t.device.id}|${null===(i=a.service)||void 0===i?void 0:i.uuid}|${a.uuid}`;this.notifyListeners(s,{value:a.value})}async stopNotifications(e){const t=await this.getCharacteristic(e);await(null===t||void 0===t?void 0:t.stopNotifications())}getFilters(e){var t;const i=[];for(const a of null!==(t=null===e||void 0===e?void 0:e.services)&&void 0!==t?t:[])i.push({services:[a],name:null===e||void 0===e?void 0:e.name,namePrefix:null===e||void 0===e?void 0:e.namePrefix});return((null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.namePrefix))&&0===i.length&&i.push({name:e.name,namePrefix:e.namePrefix}),i}getDeviceFromMap(e){const t=this.deviceMap.get(e);if(void 0===t)throw new Error('Device not found. Call "requestDevice", "requestLEScan" or "getDevices" first.');return t}getBleDevice(e){var t;return{deviceId:e.id,name:null!==(t=e.name)&&void 0!==t?t:void 0}}}}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljL2pzLzY2NS4wMTk2NjRmNS5jaHVuay5qcyIsIm1hcHBpbmdzIjoicUxBOEJNLE1BQU9BLFVBQXVCQyxFQUFBQSxHQUFwQ0MsYyxvQkFDVSxLQUFBQyxVQUFZLElBQUlDLElBQ2hCLEtBQUFDLGtCQUFvQixJQUFJRCxJQUN4QixLQUFBRSxLQUErQixLQUUvQixLQUFBQywyQkFBNkIsSUFrRjdCLEtBQUFDLGdDQUFrQ0MsS0FBS0Msd0JBQXdCQyxLQUFLRixNQThFcEUsS0FBQUcsdUJBQXlCSCxLQUFLSSxlQUFlRixLQUFLRixNQWlKbEQsS0FBQUsscUNBQXVDTCxLQUFLTSw2QkFBNkJKLEtBQUtGLEtBaUR4RixDQWhXRU8sbUJBQ0UsR0FBeUIscUJBQWRDLFlBQThCQSxVQUFVQyxVQUNqRCxNQUFNVCxLQUFLVSxZQUFZLG9EQUd6QixVQUQwQkYsVUFBVUMsVUFBVUUsa0JBRTVDLE1BQU1YLEtBQUtVLFlBQVksZ0NBRTNCLENBRUFILGtCQUVFLE1BQU8sQ0FBRUssT0FBTyxFQUNsQixDQUVBTCxlQUNFLE1BQU1QLEtBQUtVLFlBQVksa0NBQ3pCLENBRUFILGdCQUNFLE1BQU1QLEtBQUtVLFlBQVksbUNBQ3pCLENBRUFILGtDQUNFLENBR0ZBLGlDQUNFLENBR0ZBLDBCQUNFLE1BQU1QLEtBQUtVLFlBQVksNkNBQ3pCLENBRUFILDZCQUNFLE1BQU1QLEtBQUtVLFlBQVksZ0RBQ3pCLENBRUFILDhCQUNFLE1BQU1QLEtBQUtVLFlBQVksaURBQ3pCLENBRUFILHdCQUNFLE1BQU1QLEtBQUtVLFlBQVksMkNBQ3pCLENBRUFILDBCQUNFLENBR0ZBLG9CQUFvQk0sR0FDbEIsTUFBTUMsRUFBVWQsS0FBS2UsV0FBV0YsR0FDMUJHLFFBQWVSLFVBQVVDLFVBQVVRLGNBQWMsQ0FDckRILFFBQVNBLEVBQVFJLE9BQVNKLE9BQVVLLEVBQ3BDQyxpQkFBeUIsT0FBUFAsUUFBTyxJQUFQQSxPQUFPLEVBQVBBLEVBQVNPLGlCQUMzQkMsaUJBQXFDLElBQW5CUCxFQUFRSSxTQUU1QmxCLEtBQUtOLFVBQVU0QixJQUFJTixFQUFPTyxHQUFJUCxHQUU5QixPQURrQmhCLEtBQUt3QixhQUFhUixFQUV0QyxDQUVBVCxvQkFBb0JNLEdBQ2xCYixLQUFLeUIsd0JBQTBCWixFQUMvQixNQUFNQyxFQUFVZCxLQUFLZSxXQUFXRixTQUMxQmIsS0FBSzBCLGFBQ1gxQixLQUFLSixrQkFBb0IsSUFBSUQsSUFDN0JhLFVBQVVDLFVBQVVrQixvQkFDbEIsd0JBQ0EzQixLQUFLRCxpQ0FFUFMsVUFBVUMsVUFBVW1CLGlCQUFpQix3QkFBeUI1QixLQUFLRCxpQ0FDbkVDLEtBQUtILFdBQWFXLFVBQVVDLFVBQVVvQixjQUFjLENBQ2xEZixRQUFTQSxFQUFRSSxPQUFTSixPQUFVSyxFQUNwQ1csd0JBQTRDLElBQW5CaEIsRUFBUUksT0FDakNhLG9CQUE0QixPQUFQbEIsUUFBTyxJQUFQQSxPQUFPLEVBQVBBLEVBQVNtQixpQkFFbEMsQ0FJUS9CLHdCQUF3QmdDLEcsUUFDOUIsTUFBTUMsRUFBV0QsRUFBTWpCLE9BQU9PLEdBQzlCdkIsS0FBS04sVUFBVTRCLElBQUlZLEVBQVVELEVBQU1qQixRQUVuQyxJQURlaEIsS0FBS0osa0JBQWtCdUMsSUFBSUQsS0FDRCxRQUE1QkUsRUFBQXBDLEtBQUt5QiwrQkFBdUIsSUFBQVcsT0FBQSxFQUFBQSxFQUFFSixpQkFBaUIsQ0FDMURoQyxLQUFLSixrQkFBa0IwQixJQUFJWSxHQUFVLEdBQ3JDLE1BQU1sQixFQUFTaEIsS0FBS3dCLGFBQWFTLEVBQU1qQixRQUNqQ3FCLEVBQTZCLENBQ2pDckIsU0FDQXNCLFVBQVd0QixFQUFPdUIsS0FDbEJDLEtBQU1QLEVBQU1PLEtBQ1pDLFFBQVNSLEVBQU1RLFFBQ2ZDLGtCQUFrQkMsRUFBQUEsRUFBQUEsSUFBWVYsRUFBTVMsa0JBQ3BDRSxhQUFhRCxFQUFBQSxFQUFBQSxJQUFZVixFQUFNVyxhQUMvQkMsTUFBa0IsUUFBWEMsRUFBQWIsRUFBTVksYUFBSyxJQUFBQyxPQUFBLEVBQUFBLEVBQUVDLElBQUlDLEVBQUFBLEtBRTFCaEQsS0FBS2lELGdCQUFnQixlQUFnQlosRSxDQUV6QyxDQUVBOUIsbUIsT0FDZSxRQUFUNkIsRUFBQXBDLEtBQUtILFlBQUksSUFBQXVDLE9BQUEsRUFBQUEsRUFBRWMsU0FDYmxELEtBQUtILEtBQUtzRCxPQUVabkQsS0FBS0gsS0FBTyxJQUNkLENBRUFVLGlCQUFpQk0sR0FTZixNQUFPLENBQUV1QyxlQVJhNUMsVUFBVUMsVUFBVTRDLGNBRXZDQyxRQUFRdEMsR0FBV0gsRUFBUTBDLFVBQVVDLFNBQVN4QyxFQUFPTyxNQUNyRHdCLEtBQUsvQixJQUNKaEIsS0FBS04sVUFBVTRCLElBQUlOLEVBQU9PLEdBQUlQLEdBRTlCLE9BRGtCaEIsS0FBS3dCLGFBQWFSLEVBQ3BCLElBR3RCLENBRUFULDBCQUEwQmtELEdBV3hCLE1BQU8sQ0FBRUwsZUFWYTVDLFVBQVVDLFVBQVU0QyxjQUV2Q0MsUUFBUXRDLEksTUFDUCxPQUFrQixRQUFYb0IsRUFBQXBCLEVBQU8wQyxZQUFJLElBQUF0QixPQUFBLEVBQUFBLEVBQUV1QixTQUFTLElBRTlCWixLQUFLL0IsSUFDSmhCLEtBQUtOLFVBQVU0QixJQUFJTixFQUFPTyxHQUFJUCxHQUU5QixPQURrQmhCLEtBQUt3QixhQUFhUixFQUNwQixJQUd0QixDQUVBVCxjQUFjTSxHLFFBQ1osTUFBTUcsRUFBU2hCLEtBQUs0RCxpQkFBaUIvQyxFQUFRcUIsVUFDN0NsQixFQUFPVyxvQkFBb0IseUJBQTBCM0IsS0FBS0csd0JBQzFEYSxFQUFPWSxpQkFBaUIseUJBQTBCNUIsS0FBS0csd0JBQ3ZELE1BQU0wRCxFQUFlQyxTQUNyQixRQUFvQjNDLElBQWhCSCxFQUFPMEMsS0FDVCxNQUFNLElBQUlLLE1BQU0sNkJBRWxCLElBQ0UsTUFBTUMsRUFBeUIsUUFBZjVCLEVBQUF2QixFQUFRbUQsZUFBTyxJQUFBNUIsRUFBQUEsRUFBSXBDLEtBQUtGLGlDQ3JMdkNTLGVBQThCMEQsRUFBMkJDLEVBQWNDLEdBQzVFLElBQUlDLEVBQ0osT0FBT0MsUUFBUUMsS0FBSyxDQUNsQkwsRUFDQSxJQUFJSSxTQUFRLENBQUNFLEVBQUdDLEtBQ2RKLEVBQVFLLFlBQVcsSUFBTUQsRUFBT0wsSUFBWUQsRUFBSyxNQUVsRFEsU0FBUSxJQUFNQyxhQUFhUCxJQUNoQyxDRDhLWVEsQ0FBZTVELEVBQU8wQyxLQUFLbUIsVUFBV2IsRUFBU0gsRSxDQUNyRCxNQUFPaUIsR0FJUCxZQURpQixRQUFYaEMsRUFBQTlCLEVBQU8wQyxZQUFJLElBQUFaLE9BQUEsRUFBQUEsRUFBRWlDLGNBQ2ZELElBQVVqQixFQUNOLElBQUlFLE1BQU0sc0JBRVZlLEMsQ0FHWixDQUlRMUUsZUFBZTZCLEdBQ3JCLE1BQ00rQyxFQUFNLGdCQURNL0MsRUFBTWdELE9BQTJCMUQsS0FFbkR2QixLQUFLaUQsZ0JBQWdCK0IsRUFBSyxLQUM1QixDQUVBekUsaUJBQWlCa0QsR0FDZixNQUFNekQsS0FBS1UsWUFBWSxzQ0FDekIsQ0FFQUgsZUFBZWtELEdBQ2IsTUFBTXpELEtBQUtVLFlBQVksb0NBQ3pCLENBRUFILGlCQUFpQk0sRyxNQUM2QixRQUE1Q3VCLEVBQUFwQyxLQUFLNEQsaUJBQWlCL0MsRUFBUXFCLFVBQVV3QixZQUFJLElBQUF0QixHQUFBQSxFQUFFMkMsWUFDaEQsQ0FFQXhFLGtCQUFrQk0sRyxRQUNoQixNQUFNcUUsRUFBcUYsUUFBMUVwQyxRQUFtRCxRQUE1Q1YsRUFBQXBDLEtBQUs0RCxpQkFBaUIvQyxFQUFRcUIsVUFBVXdCLFlBQUksSUFBQXRCLE9BQUEsRUFBQUEsRUFBRStDLDZCQUFxQixJQUFBckMsRUFBQUEsRUFBSSxHQUN6RnNDLEVBQTRCLEdBQ2xDLElBQUssTUFBTUMsS0FBV0gsRUFBVSxDQUM5QixNQUFNSSxRQUF3QkQsRUFBUUUscUJBQ2hDQyxFQUEwQyxHQUNoRCxJQUFLLE1BQU1DLEtBQWtCSCxFQUMzQkUsRUFBbUJFLEtBQUssQ0FDdEJDLEtBQU1GLEVBQWVFLEtBQ3JCQyxXQUFZNUYsS0FBSzZGLGNBQWNKLEdBQy9CSyxrQkFBbUI5RixLQUFLK0YsZUFBZU4sS0FHM0NMLEVBQVlNLEtBQUssQ0FBRUMsS0FBTU4sRUFBUU0sS0FBTUwsZ0JBQWlCRSxHLENBRTFELE1BQU8sQ0FBRU4sU0FBVUUsRUFDckIsQ0FFUTdFLHFCQUFxQmtGLEdBQzNCLElBRUUsYUFEMEJBLEVBQWVNLGtCQUN0QmhELEtBQUtpRCxJQUFVLENBQ2hDTCxLQUFNSyxFQUFXTCxRLENBRW5CLE1BQUF2RCxHQUNBLE1BQU8sRSxDQUVYLENBRVF5RCxjQUFjSixHQUNwQixNQUFPLENBQ0xRLFVBQVdSLEVBQWVHLFdBQVdLLFVBQ3JDQyxLQUFNVCxFQUFlRyxXQUFXTSxLQUNoQ0MscUJBQXNCVixFQUFlRyxXQUFXTyxxQkFDaERDLE1BQU9YLEVBQWVHLFdBQVdRLE1BQ2pDQyxPQUFRWixFQUFlRyxXQUFXUyxPQUNsQ0MsU0FBVWIsRUFBZUcsV0FBV1UsU0FDcENDLDBCQUEyQmQsRUFBZUcsV0FBV1csMEJBQ3JEQyxjQUFlZixFQUFlRyxXQUFXWSxjQUN6Q0Msb0JBQXFCaEIsRUFBZUcsV0FBV2Esb0JBRW5ELENBRVFsRyx3QkFDTk0sRyxNQUVBLE1BQU13RSxRQUE0RCxRQUE1Q2pELEVBQUFwQyxLQUFLNEQsaUJBQWlCL0MsRUFBUXFCLFVBQVV3QixZQUFJLElBQUF0QixPQUFBLEVBQUFBLEVBQUVzRSxrQkFBeUIsT0FBUDdGLFFBQU8sSUFBUEEsT0FBTyxFQUFQQSxFQUFTd0UsVUFDL0YsT0FBYyxPQUFQQSxRQUFPLElBQVBBLE9BQU8sRUFBUEEsRUFBU3NCLGtCQUF5QixPQUFQOUYsUUFBTyxJQUFQQSxPQUFPLEVBQVBBLEVBQVM0RSxlQUM3QyxDQUVRbEYsb0JBQ05NLEdBRUEsTUFBTTRFLFFBQXVCekYsS0FBSzJHLGtCQUFrQjlGLEdBQ3BELE9BQXFCLE9BQWQ0RSxRQUFjLElBQWRBLE9BQWMsRUFBZEEsRUFBZ0JtQixjQUFxQixPQUFQL0YsUUFBTyxJQUFQQSxPQUFPLEVBQVBBLEVBQVNtRixXQUNoRCxDQUVBekYsdUJBQXVCa0QsR0FDckIsTUFBTXpELEtBQUtVLFlBQVksNENBQ3pCLENBRUFILGFBQWFrRCxHQUNYLE1BQU16RCxLQUFLVSxZQUFZLGtDQUN6QixDQUVBSCxnQ0FBZ0NrRCxHQUM5QixNQUFNekQsS0FBS1UsWUFBWSxxREFDekIsQ0FFQUgsZUFBZWtELEdBQ2IsTUFBTXpELEtBQUtVLFlBQVksb0NBQ3pCLENBRUFILFdBQVdNLEdBQ1QsTUFBTTRFLFFBQXVCekYsS0FBSzJHLGtCQUFrQjlGLEdBRXBELE1BQU8sQ0FBRUQsWUFEeUIsT0FBZDZFLFFBQWMsSUFBZEEsT0FBYyxFQUFkQSxFQUFnQm9CLGFBRXRDLENBRUF0RyxZQUFZTSxHQUNWLE1BQU00RSxRQUF1QnpGLEtBQUsyRyxrQkFBa0I5RixHQUNwRCxJQUFJaUcsRUFFRkEsRUFEMkIsa0JBQWxCakcsRUFBUUQsT0FDTm1HLEVBQUFBLEVBQUFBLElBQW9CbEcsRUFBUUQsT0FFNUJDLEVBQVFELFlBRUQsT0FBZDZFLFFBQWMsSUFBZEEsT0FBYyxFQUFkQSxFQUFnQnVCLHVCQUF1QkYsR0FDL0MsQ0FFQXZHLDJCQUEyQk0sR0FDekIsTUFBTTRFLFFBQXVCekYsS0FBSzJHLGtCQUFrQjlGLEdBQ3BELElBQUlpRyxFQUVGQSxFQUQyQixrQkFBbEJqRyxFQUFRRCxPQUNObUcsRUFBQUEsRUFBQUEsSUFBb0JsRyxFQUFRRCxPQUU1QkMsRUFBUUQsWUFFRCxPQUFkNkUsUUFBYyxJQUFkQSxPQUFjLEVBQWRBLEVBQWdCd0IsMEJBQTBCSCxHQUNsRCxDQUVBdkcscUJBQXFCTSxHQUNuQixNQUFNbUYsUUFBbUJoRyxLQUFLNEcsY0FBYy9GLEdBRTVDLE1BQU8sQ0FBRUQsWUFEcUIsT0FBVm9GLFFBQVUsSUFBVkEsT0FBVSxFQUFWQSxFQUFZYSxhQUVsQyxDQUVBdEcsc0JBQXNCTSxHQUNwQixNQUFNbUYsUUFBbUJoRyxLQUFLNEcsY0FBYy9GLEdBQzVDLElBQUlpRyxFQUVGQSxFQUQyQixrQkFBbEJqRyxFQUFRRCxPQUNObUcsRUFBQUEsRUFBQUEsSUFBb0JsRyxFQUFRRCxPQUU1QkMsRUFBUUQsWUFFTCxPQUFWb0YsUUFBVSxJQUFWQSxPQUFVLEVBQVZBLEVBQVlrQixXQUFXSixHQUMvQixDQUVBdkcseUJBQXlCTSxHQUN2QixNQUFNNEUsUUFBdUJ6RixLQUFLMkcsa0JBQWtCOUYsR0FDdEMsT0FBZDRFLFFBQWMsSUFBZEEsR0FBQUEsRUFBZ0I5RCxvQkFBb0IsNkJBQThCM0IsS0FBS0ssc0NBQ3pELE9BQWRvRixRQUFjLElBQWRBLEdBQUFBLEVBQWdCN0QsaUJBQWlCLDZCQUE4QjVCLEtBQUtLLDRDQUNoRCxPQUFkb0YsUUFBYyxJQUFkQSxPQUFjLEVBQWRBLEVBQWdCMEIscUJBQ3hCLENBSVE3Ryw2QkFBNkIyQixHLFFBQ25DLE1BQU13RCxFQUFpQnhELEVBQU1nRCxPQUN2QkQsRUFBTSxnQkFBc0MsUUFBdEI1QyxFQUFBcUQsRUFBZUosZUFBTyxJQUFBakQsT0FBQSxFQUFBQSxFQUFFcEIsT0FBT08sTUFBNEIsUUFBdEJ1QixFQUFBMkMsRUFBZUosZUFBTyxJQUFBdkMsT0FBQSxFQUFBQSxFQUFFNkMsUUFBUUYsRUFBZUUsT0FDaEgzRixLQUFLaUQsZ0JBQWdCK0IsRUFBSyxDQUN4QnBFLE1BQU82RSxFQUFlN0UsT0FFMUIsQ0FFQUwsd0JBQXdCTSxHQUN0QixNQUFNNEUsUUFBdUJ6RixLQUFLMkcsa0JBQWtCOUYsU0FDaEMsT0FBZDRFLFFBQWMsSUFBZEEsT0FBYyxFQUFkQSxFQUFnQjJCLG9CQUN4QixDQUVRckcsV0FBV0YsRyxNQUNqQixNQUFNQyxFQUFtQyxHQUN6QyxJQUFLLE1BQU11RSxLQUE0QixRQUFqQmpELEVBQU8sT0FBUHZCLFFBQU8sSUFBUEEsT0FBTyxFQUFQQSxFQUFTcUUsZ0JBQVEsSUFBQTlDLEVBQUFBLEVBQUksR0FDekN0QixFQUFRNEUsS0FBSyxDQUNYUixTQUFVLENBQUNHLEdBQ1g5QyxLQUFhLE9BQVAxQixRQUFPLElBQVBBLE9BQU8sRUFBUEEsRUFBUzBCLEtBQ2Y4RSxXQUFtQixPQUFQeEcsUUFBTyxJQUFQQSxPQUFPLEVBQVBBLEVBQVN3RyxhQVN6QixRQU5ZLE9BQVB4RyxRQUFPLElBQVBBLE9BQU8sRUFBUEEsRUFBUzBCLFFBQWUsT0FBUDFCLFFBQU8sSUFBUEEsT0FBTyxFQUFQQSxFQUFTd0csY0FBa0MsSUFBbkJ2RyxFQUFRSSxRQUNwREosRUFBUTRFLEtBQUssQ0FDWG5ELEtBQU0xQixFQUFRMEIsS0FDZDhFLFdBQVl4RyxFQUFRd0csYUFHakJ2RyxDQUNULENBRVE4QyxpQkFBaUIxQixHQUN2QixNQUFNbEIsRUFBU2hCLEtBQUtOLFVBQVU0SCxJQUFJcEYsR0FDbEMsUUFBZWYsSUFBWEgsRUFDRixNQUFNLElBQUkrQyxNQUFNLGtGQUVsQixPQUFPL0MsQ0FDVCxDQUVRUSxhQUFhUixHLE1BTW5CLE1BTDZCLENBQzNCa0IsU0FBVWxCLEVBQU9PLEdBRWpCZ0IsS0FBaUIsUUFBWEgsRUFBQXBCLEVBQU91QixZQUFJLElBQUFILEVBQUFBLE9BQUlqQixFQUd6QixFIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci1jb21tdW5pdHkvYmx1ZXRvb3RoLWxlL3NyYy93ZWIudHMiLCIuLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci1jb21tdW5pdHkvYmx1ZXRvb3RoLWxlL3NyYy90aW1lb3V0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdlYlBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB7IGhleFN0cmluZ1RvRGF0YVZpZXcsIG1hcFRvT2JqZWN0LCB3ZWJVVUlEVG9TdHJpbmcgfSBmcm9tICcuL2NvbnZlcnNpb24nO1xuaW1wb3J0IHR5cGUge1xuICBCbGVDaGFyYWN0ZXJpc3RpYyxcbiAgQmxlQ2hhcmFjdGVyaXN0aWNQcm9wZXJ0aWVzLFxuICBCbGVEZXNjcmlwdG9yLFxuICBCbGVTZXJ2aWNlLFxuICBUaW1lb3V0T3B0aW9ucyxcbiAgQmxlRGV2aWNlLFxuICBCbGVTZXJ2aWNlcyxcbiAgQmx1ZXRvb3RoTGVQbHVnaW4sXG4gIEJvb2xlYW5SZXN1bHQsXG4gIERldmljZUlkT3B0aW9ucyxcbiAgR2V0Q29ubmVjdGVkRGV2aWNlc09wdGlvbnMsXG4gIEdldERldmljZXNPcHRpb25zLFxuICBHZXREZXZpY2VzUmVzdWx0LFxuICBSZWFkRGVzY3JpcHRvck9wdGlvbnMsXG4gIFJlYWRPcHRpb25zLFxuICBSZWFkUmVzdWx0LFxuICBSZWFkUnNzaVJlc3VsdCxcbiAgUmVxdWVzdEJsZURldmljZU9wdGlvbnMsXG4gIFNjYW5SZXN1bHRJbnRlcm5hbCxcbiAgV3JpdGVPcHRpb25zLFxuICBXcml0ZURlc2NyaXB0b3JPcHRpb25zLFxuICBHZXRNdHVSZXN1bHQsXG4gIFJlcXVlc3RDb25uZWN0aW9uUHJpb3JpdHlPcHRpb25zLFxufSBmcm9tICcuL2RlZmluaXRpb25zJztcbmltcG9ydCB7IHJ1bldpdGhUaW1lb3V0IH0gZnJvbSAnLi90aW1lb3V0JztcblxuZXhwb3J0IGNsYXNzIEJsdWV0b290aExlV2ViIGV4dGVuZHMgV2ViUGx1Z2luIGltcGxlbWVudHMgQmx1ZXRvb3RoTGVQbHVnaW4ge1xuICBwcml2YXRlIGRldmljZU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBCbHVldG9vdGhEZXZpY2U+KCk7XG4gIHByaXZhdGUgZGlzY292ZXJlZERldmljZXMgPSBuZXcgTWFwPHN0cmluZywgYm9vbGVhbj4oKTtcbiAgcHJpdmF0ZSBzY2FuOiBCbHVldG9vdGhMRVNjYW4gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSByZXF1ZXN0QmxlRGV2aWNlT3B0aW9uczogUmVxdWVzdEJsZURldmljZU9wdGlvbnMgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgREVGQVVMVF9DT05ORUNUSU9OX1RJTUVPVVQgPSAxMDAwMDtcblxuICBhc3luYyBpbml0aWFsaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhbmF2aWdhdG9yLmJsdWV0b290aCkge1xuICAgICAgdGhyb3cgdGhpcy51bmF2YWlsYWJsZSgnV2ViIEJsdWV0b290aCBBUEkgbm90IGF2YWlsYWJsZSBpbiB0aGlzIGJyb3dzZXIuJyk7XG4gICAgfVxuICAgIGNvbnN0IGlzQXZhaWxhYmxlID0gYXdhaXQgbmF2aWdhdG9yLmJsdWV0b290aC5nZXRBdmFpbGFiaWxpdHkoKTtcbiAgICBpZiAoIWlzQXZhaWxhYmxlKSB7XG4gICAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlKCdObyBCbHVldG9vdGggcmFkaW8gYXZhaWxhYmxlLicpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGlzRW5hYmxlZCgpOiBQcm9taXNlPEJvb2xlYW5SZXN1bHQ+IHtcbiAgICAvLyBub3QgYXZhaWxhYmxlIG9uIHdlYlxuICAgIHJldHVybiB7IHZhbHVlOiB0cnVlIH07XG4gIH1cblxuICBhc3luYyBlbmFibGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhyb3cgdGhpcy51bmF2YWlsYWJsZSgnZW5hYmxlIGlzIG5vdCBhdmFpbGFibGUgb24gd2ViLicpO1xuICB9XG5cbiAgYXN5bmMgZGlzYWJsZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlKCdkaXNhYmxlIGlzIG5vdCBhdmFpbGFibGUgb24gd2ViLicpO1xuICB9XG5cbiAgYXN5bmMgc3RhcnRFbmFibGVkTm90aWZpY2F0aW9ucygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBub3QgYXZhaWxhYmxlIG9uIHdlYlxuICB9XG5cbiAgYXN5bmMgc3RvcEVuYWJsZWROb3RpZmljYXRpb25zKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIG5vdCBhdmFpbGFibGUgb24gd2ViXG4gIH1cblxuICBhc3luYyBpc0xvY2F0aW9uRW5hYmxlZCgpOiBQcm9taXNlPEJvb2xlYW5SZXN1bHQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlKCdpc0xvY2F0aW9uRW5hYmxlZCBpcyBub3QgYXZhaWxhYmxlIG9uIHdlYi4nKTtcbiAgfVxuXG4gIGFzeW5jIG9wZW5Mb2NhdGlvblNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRocm93IHRoaXMudW5hdmFpbGFibGUoJ29wZW5Mb2NhdGlvblNldHRpbmdzIGlzIG5vdCBhdmFpbGFibGUgb24gd2ViLicpO1xuICB9XG5cbiAgYXN5bmMgb3BlbkJsdWV0b290aFNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRocm93IHRoaXMudW5hdmFpbGFibGUoJ29wZW5CbHVldG9vdGhTZXR0aW5ncyBpcyBub3QgYXZhaWxhYmxlIG9uIHdlYi4nKTtcbiAgfVxuXG4gIGFzeW5jIG9wZW5BcHBTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlKCdvcGVuQXBwU2V0dGluZ3MgaXMgbm90IGF2YWlsYWJsZSBvbiB3ZWIuJyk7XG4gIH1cblxuICBhc3luYyBzZXREaXNwbGF5U3RyaW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBub3QgYXZhaWxhYmxlIG9uIHdlYlxuICB9XG5cbiAgYXN5bmMgcmVxdWVzdERldmljZShvcHRpb25zPzogUmVxdWVzdEJsZURldmljZU9wdGlvbnMpOiBQcm9taXNlPEJsZURldmljZT4ge1xuICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLmdldEZpbHRlcnMob3B0aW9ucyk7XG4gICAgY29uc3QgZGV2aWNlID0gYXdhaXQgbmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKHtcbiAgICAgIGZpbHRlcnM6IGZpbHRlcnMubGVuZ3RoID8gZmlsdGVycyA6IHVuZGVmaW5lZCxcbiAgICAgIG9wdGlvbmFsU2VydmljZXM6IG9wdGlvbnM/Lm9wdGlvbmFsU2VydmljZXMsXG4gICAgICBhY2NlcHRBbGxEZXZpY2VzOiBmaWx0ZXJzLmxlbmd0aCA9PT0gMCxcbiAgICB9KTtcbiAgICB0aGlzLmRldmljZU1hcC5zZXQoZGV2aWNlLmlkLCBkZXZpY2UpO1xuICAgIGNvbnN0IGJsZURldmljZSA9IHRoaXMuZ2V0QmxlRGV2aWNlKGRldmljZSk7XG4gICAgcmV0dXJuIGJsZURldmljZTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3RMRVNjYW4ob3B0aW9ucz86IFJlcXVlc3RCbGVEZXZpY2VPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5yZXF1ZXN0QmxlRGV2aWNlT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgY29uc3QgZmlsdGVycyA9IHRoaXMuZ2V0RmlsdGVycyhvcHRpb25zKTtcbiAgICBhd2FpdCB0aGlzLnN0b3BMRVNjYW4oKTtcbiAgICB0aGlzLmRpc2NvdmVyZWREZXZpY2VzID0gbmV3IE1hcDxzdHJpbmcsIGJvb2xlYW4+KCk7XG4gICAgbmF2aWdhdG9yLmJsdWV0b290aC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgJ2FkdmVydGlzZW1lbnRyZWNlaXZlZCcsXG4gICAgICB0aGlzLm9uQWR2ZXJ0aXNlbWVudFJlY2VpdmVkQ2FsbGJhY2sgYXMgRXZlbnRMaXN0ZW5lclxuICAgICk7XG4gICAgbmF2aWdhdG9yLmJsdWV0b290aC5hZGRFdmVudExpc3RlbmVyKCdhZHZlcnRpc2VtZW50cmVjZWl2ZWQnLCB0aGlzLm9uQWR2ZXJ0aXNlbWVudFJlY2VpdmVkQ2FsbGJhY2spO1xuICAgIHRoaXMuc2NhbiA9IGF3YWl0IG5hdmlnYXRvci5ibHVldG9vdGgucmVxdWVzdExFU2Nhbih7XG4gICAgICBmaWx0ZXJzOiBmaWx0ZXJzLmxlbmd0aCA/IGZpbHRlcnMgOiB1bmRlZmluZWQsXG4gICAgICBhY2NlcHRBbGxBZHZlcnRpc2VtZW50czogZmlsdGVycy5sZW5ndGggPT09IDAsXG4gICAgICBrZWVwUmVwZWF0ZWREZXZpY2VzOiBvcHRpb25zPy5hbGxvd0R1cGxpY2F0ZXMsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uQWR2ZXJ0aXNlbWVudFJlY2VpdmVkQ2FsbGJhY2sgPSB0aGlzLm9uQWR2ZXJ0aXNlbWVudFJlY2VpdmVkLmJpbmQodGhpcyk7XG5cbiAgcHJpdmF0ZSBvbkFkdmVydGlzZW1lbnRSZWNlaXZlZChldmVudDogQmx1ZXRvb3RoQWR2ZXJ0aXNpbmdFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGRldmljZUlkID0gZXZlbnQuZGV2aWNlLmlkO1xuICAgIHRoaXMuZGV2aWNlTWFwLnNldChkZXZpY2VJZCwgZXZlbnQuZGV2aWNlKTtcbiAgICBjb25zdCBpc05ldyA9ICF0aGlzLmRpc2NvdmVyZWREZXZpY2VzLmhhcyhkZXZpY2VJZCk7XG4gICAgaWYgKGlzTmV3IHx8IHRoaXMucmVxdWVzdEJsZURldmljZU9wdGlvbnM/LmFsbG93RHVwbGljYXRlcykge1xuICAgICAgdGhpcy5kaXNjb3ZlcmVkRGV2aWNlcy5zZXQoZGV2aWNlSWQsIHRydWUpO1xuICAgICAgY29uc3QgZGV2aWNlID0gdGhpcy5nZXRCbGVEZXZpY2UoZXZlbnQuZGV2aWNlKTtcbiAgICAgIGNvbnN0IHJlc3VsdDogU2NhblJlc3VsdEludGVybmFsID0ge1xuICAgICAgICBkZXZpY2UsXG4gICAgICAgIGxvY2FsTmFtZTogZGV2aWNlLm5hbWUsXG4gICAgICAgIHJzc2k6IGV2ZW50LnJzc2ksXG4gICAgICAgIHR4UG93ZXI6IGV2ZW50LnR4UG93ZXIsXG4gICAgICAgIG1hbnVmYWN0dXJlckRhdGE6IG1hcFRvT2JqZWN0KGV2ZW50Lm1hbnVmYWN0dXJlckRhdGEpLFxuICAgICAgICBzZXJ2aWNlRGF0YTogbWFwVG9PYmplY3QoZXZlbnQuc2VydmljZURhdGEpLFxuICAgICAgICB1dWlkczogZXZlbnQudXVpZHM/Lm1hcCh3ZWJVVUlEVG9TdHJpbmcpLFxuICAgICAgfTtcbiAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKCdvblNjYW5SZXN1bHQnLCByZXN1bHQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHN0b3BMRVNjYW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuc2Nhbj8uYWN0aXZlKSB7XG4gICAgICB0aGlzLnNjYW4uc3RvcCgpO1xuICAgIH1cbiAgICB0aGlzLnNjYW4gPSBudWxsO1xuICB9XG5cbiAgYXN5bmMgZ2V0RGV2aWNlcyhvcHRpb25zOiBHZXREZXZpY2VzT3B0aW9ucyk6IFByb21pc2U8R2V0RGV2aWNlc1Jlc3VsdD4ge1xuICAgIGNvbnN0IGRldmljZXMgPSBhd2FpdCBuYXZpZ2F0b3IuYmx1ZXRvb3RoLmdldERldmljZXMoKTtcbiAgICBjb25zdCBibGVEZXZpY2VzID0gZGV2aWNlc1xuICAgICAgLmZpbHRlcigoZGV2aWNlKSA9PiBvcHRpb25zLmRldmljZUlkcy5pbmNsdWRlcyhkZXZpY2UuaWQpKVxuICAgICAgLm1hcCgoZGV2aWNlKSA9PiB7XG4gICAgICAgIHRoaXMuZGV2aWNlTWFwLnNldChkZXZpY2UuaWQsIGRldmljZSk7XG4gICAgICAgIGNvbnN0IGJsZURldmljZSA9IHRoaXMuZ2V0QmxlRGV2aWNlKGRldmljZSk7XG4gICAgICAgIHJldHVybiBibGVEZXZpY2U7XG4gICAgICB9KTtcbiAgICByZXR1cm4geyBkZXZpY2VzOiBibGVEZXZpY2VzIH07XG4gIH1cblxuICBhc3luYyBnZXRDb25uZWN0ZWREZXZpY2VzKF9vcHRpb25zOiBHZXRDb25uZWN0ZWREZXZpY2VzT3B0aW9ucyk6IFByb21pc2U8R2V0RGV2aWNlc1Jlc3VsdD4ge1xuICAgIGNvbnN0IGRldmljZXMgPSBhd2FpdCBuYXZpZ2F0b3IuYmx1ZXRvb3RoLmdldERldmljZXMoKTtcbiAgICBjb25zdCBibGVEZXZpY2VzID0gZGV2aWNlc1xuICAgICAgLmZpbHRlcigoZGV2aWNlKSA9PiB7XG4gICAgICAgIHJldHVybiBkZXZpY2UuZ2F0dD8uY29ubmVjdGVkO1xuICAgICAgfSlcbiAgICAgIC5tYXAoKGRldmljZSkgPT4ge1xuICAgICAgICB0aGlzLmRldmljZU1hcC5zZXQoZGV2aWNlLmlkLCBkZXZpY2UpO1xuICAgICAgICBjb25zdCBibGVEZXZpY2UgPSB0aGlzLmdldEJsZURldmljZShkZXZpY2UpO1xuICAgICAgICByZXR1cm4gYmxlRGV2aWNlO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIHsgZGV2aWNlczogYmxlRGV2aWNlcyB9O1xuICB9XG5cbiAgYXN5bmMgY29ubmVjdChvcHRpb25zOiBEZXZpY2VJZE9wdGlvbnMgJiBUaW1lb3V0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGRldmljZSA9IHRoaXMuZ2V0RGV2aWNlRnJvbU1hcChvcHRpb25zLmRldmljZUlkKTtcbiAgICBkZXZpY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignZ2F0dHNlcnZlcmRpc2Nvbm5lY3RlZCcsIHRoaXMub25EaXNjb25uZWN0ZWRDYWxsYmFjayk7XG4gICAgZGV2aWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2dhdHRzZXJ2ZXJkaXNjb25uZWN0ZWQnLCB0aGlzLm9uRGlzY29ubmVjdGVkQ2FsbGJhY2spO1xuICAgIGNvbnN0IHRpbWVvdXRFcnJvciA9IFN5bWJvbCgpO1xuICAgIGlmIChkZXZpY2UuZ2F0dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGdhdHQgc2VydmVyIGF2YWlsYWJsZS4nKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgPz8gdGhpcy5ERUZBVUxUX0NPTk5FQ1RJT05fVElNRU9VVDtcbiAgICAgIGF3YWl0IHJ1bldpdGhUaW1lb3V0KGRldmljZS5nYXR0LmNvbm5lY3QoKSwgdGltZW91dCwgdGltZW91dEVycm9yKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gY2FuY2VsIHBlbmRpbmcgY29ubmVjdCBjYWxsLCBkb2VzIG5vdCB3b3JrIHlldCBpbiBjaHJvbWl1bSBiZWNhdXNlIG9mIGEgYnVnOlxuICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9Njg0MDczXG4gICAgICBhd2FpdCBkZXZpY2UuZ2F0dD8uZGlzY29ubmVjdCgpO1xuICAgICAgaWYgKGVycm9yID09PSB0aW1lb3V0RXJyb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25uZWN0aW9uIHRpbWVvdXQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25EaXNjb25uZWN0ZWRDYWxsYmFjayA9IHRoaXMub25EaXNjb25uZWN0ZWQuYmluZCh0aGlzKTtcblxuICBwcml2YXRlIG9uRGlzY29ubmVjdGVkKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGRldmljZUlkID0gKGV2ZW50LnRhcmdldCBhcyBCbHVldG9vdGhEZXZpY2UpLmlkO1xuICAgIGNvbnN0IGtleSA9IGBkaXNjb25uZWN0ZWR8JHtkZXZpY2VJZH1gO1xuICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKGtleSwgbnVsbCk7XG4gIH1cblxuICBhc3luYyBjcmVhdGVCb25kKF9vcHRpb25zOiBEZXZpY2VJZE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlKCdjcmVhdGVCb25kIGlzIG5vdCBhdmFpbGFibGUgb24gd2ViLicpO1xuICB9XG5cbiAgYXN5bmMgaXNCb25kZWQoX29wdGlvbnM6IERldmljZUlkT3B0aW9ucyk6IFByb21pc2U8Qm9vbGVhblJlc3VsdD4ge1xuICAgIHRocm93IHRoaXMudW5hdmFpbGFibGUoJ2lzQm9uZGVkIGlzIG5vdCBhdmFpbGFibGUgb24gd2ViLicpO1xuICB9XG5cbiAgYXN5bmMgZGlzY29ubmVjdChvcHRpb25zOiBEZXZpY2VJZE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmdldERldmljZUZyb21NYXAob3B0aW9ucy5kZXZpY2VJZCkuZ2F0dD8uZGlzY29ubmVjdCgpO1xuICB9XG5cbiAgYXN5bmMgZ2V0U2VydmljZXMob3B0aW9uczogRGV2aWNlSWRPcHRpb25zKTogUHJvbWlzZTxCbGVTZXJ2aWNlcz4ge1xuICAgIGNvbnN0IHNlcnZpY2VzID0gKGF3YWl0IHRoaXMuZ2V0RGV2aWNlRnJvbU1hcChvcHRpb25zLmRldmljZUlkKS5nYXR0Py5nZXRQcmltYXJ5U2VydmljZXMoKSkgPz8gW107XG4gICAgY29uc3QgYmxlU2VydmljZXM6IEJsZVNlcnZpY2VbXSA9IFtdO1xuICAgIGZvciAoY29uc3Qgc2VydmljZSBvZiBzZXJ2aWNlcykge1xuICAgICAgY29uc3QgY2hhcmFjdGVyaXN0aWNzID0gYXdhaXQgc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpY3MoKTtcbiAgICAgIGNvbnN0IGJsZUNoYXJhY3RlcmlzdGljczogQmxlQ2hhcmFjdGVyaXN0aWNbXSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBjaGFyYWN0ZXJpc3RpYyBvZiBjaGFyYWN0ZXJpc3RpY3MpIHtcbiAgICAgICAgYmxlQ2hhcmFjdGVyaXN0aWNzLnB1c2goe1xuICAgICAgICAgIHV1aWQ6IGNoYXJhY3RlcmlzdGljLnV1aWQsXG4gICAgICAgICAgcHJvcGVydGllczogdGhpcy5nZXRQcm9wZXJ0aWVzKGNoYXJhY3RlcmlzdGljKSxcbiAgICAgICAgICBkZXNjcmlwdG9yczogYXdhaXQgdGhpcy5nZXREZXNjcmlwdG9ycyhjaGFyYWN0ZXJpc3RpYyksXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYmxlU2VydmljZXMucHVzaCh7IHV1aWQ6IHNlcnZpY2UudXVpZCwgY2hhcmFjdGVyaXN0aWNzOiBibGVDaGFyYWN0ZXJpc3RpY3MgfSk7XG4gICAgfVxuICAgIHJldHVybiB7IHNlcnZpY2VzOiBibGVTZXJ2aWNlcyB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXREZXNjcmlwdG9ycyhjaGFyYWN0ZXJpc3RpYzogQmx1ZXRvb3RoUmVtb3RlR0FUVENoYXJhY3RlcmlzdGljKTogUHJvbWlzZTxCbGVEZXNjcmlwdG9yW10+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVzY3JpcHRvcnMgPSBhd2FpdCBjaGFyYWN0ZXJpc3RpYy5nZXREZXNjcmlwdG9ycygpO1xuICAgICAgcmV0dXJuIGRlc2NyaXB0b3JzLm1hcCgoZGVzY3JpcHRvcikgPT4gKHtcbiAgICAgICAgdXVpZDogZGVzY3JpcHRvci51dWlkLFxuICAgICAgfSkpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0UHJvcGVydGllcyhjaGFyYWN0ZXJpc3RpYzogQmx1ZXRvb3RoUmVtb3RlR0FUVENoYXJhY3RlcmlzdGljKTogQmxlQ2hhcmFjdGVyaXN0aWNQcm9wZXJ0aWVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgYnJvYWRjYXN0OiBjaGFyYWN0ZXJpc3RpYy5wcm9wZXJ0aWVzLmJyb2FkY2FzdCxcbiAgICAgIHJlYWQ6IGNoYXJhY3RlcmlzdGljLnByb3BlcnRpZXMucmVhZCxcbiAgICAgIHdyaXRlV2l0aG91dFJlc3BvbnNlOiBjaGFyYWN0ZXJpc3RpYy5wcm9wZXJ0aWVzLndyaXRlV2l0aG91dFJlc3BvbnNlLFxuICAgICAgd3JpdGU6IGNoYXJhY3RlcmlzdGljLnByb3BlcnRpZXMud3JpdGUsXG4gICAgICBub3RpZnk6IGNoYXJhY3RlcmlzdGljLnByb3BlcnRpZXMubm90aWZ5LFxuICAgICAgaW5kaWNhdGU6IGNoYXJhY3RlcmlzdGljLnByb3BlcnRpZXMuaW5kaWNhdGUsXG4gICAgICBhdXRoZW50aWNhdGVkU2lnbmVkV3JpdGVzOiBjaGFyYWN0ZXJpc3RpYy5wcm9wZXJ0aWVzLmF1dGhlbnRpY2F0ZWRTaWduZWRXcml0ZXMsXG4gICAgICByZWxpYWJsZVdyaXRlOiBjaGFyYWN0ZXJpc3RpYy5wcm9wZXJ0aWVzLnJlbGlhYmxlV3JpdGUsXG4gICAgICB3cml0YWJsZUF1eGlsaWFyaWVzOiBjaGFyYWN0ZXJpc3RpYy5wcm9wZXJ0aWVzLndyaXRhYmxlQXV4aWxpYXJpZXMsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0Q2hhcmFjdGVyaXN0aWMoXG4gICAgb3B0aW9uczogUmVhZE9wdGlvbnMgfCBXcml0ZU9wdGlvbnNcbiAgKTogUHJvbWlzZTxCbHVldG9vdGhSZW1vdGVHQVRUQ2hhcmFjdGVyaXN0aWMgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBzZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXREZXZpY2VGcm9tTWFwKG9wdGlvbnMuZGV2aWNlSWQpLmdhdHQ/LmdldFByaW1hcnlTZXJ2aWNlKG9wdGlvbnM/LnNlcnZpY2UpO1xuICAgIHJldHVybiBzZXJ2aWNlPy5nZXRDaGFyYWN0ZXJpc3RpYyhvcHRpb25zPy5jaGFyYWN0ZXJpc3RpYyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldERlc2NyaXB0b3IoXG4gICAgb3B0aW9uczogUmVhZERlc2NyaXB0b3JPcHRpb25zIHwgV3JpdGVEZXNjcmlwdG9yT3B0aW9uc1xuICApOiBQcm9taXNlPEJsdWV0b290aFJlbW90ZUdBVFREZXNjcmlwdG9yIHwgdW5kZWZpbmVkPiB7XG4gICAgY29uc3QgY2hhcmFjdGVyaXN0aWMgPSBhd2FpdCB0aGlzLmdldENoYXJhY3RlcmlzdGljKG9wdGlvbnMpO1xuICAgIHJldHVybiBjaGFyYWN0ZXJpc3RpYz8uZ2V0RGVzY3JpcHRvcihvcHRpb25zPy5kZXNjcmlwdG9yKTtcbiAgfVxuXG4gIGFzeW5jIGRpc2NvdmVyU2VydmljZXMoX29wdGlvbnM6IERldmljZUlkT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRocm93IHRoaXMudW5hdmFpbGFibGUoJ2Rpc2NvdmVyU2VydmljZXMgaXMgbm90IGF2YWlsYWJsZSBvbiB3ZWIuJyk7XG4gIH1cblxuICBhc3luYyBnZXRNdHUoX29wdGlvbnM6IERldmljZUlkT3B0aW9ucyk6IFByb21pc2U8R2V0TXR1UmVzdWx0PiB7XG4gICAgdGhyb3cgdGhpcy51bmF2YWlsYWJsZSgnZ2V0TXR1IGlzIG5vdCBhdmFpbGFibGUgb24gd2ViLicpO1xuICB9XG5cbiAgYXN5bmMgcmVxdWVzdENvbm5lY3Rpb25Qcmlvcml0eShfb3B0aW9uczogUmVxdWVzdENvbm5lY3Rpb25Qcmlvcml0eU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlKCdyZXF1ZXN0Q29ubmVjdGlvblByaW9yaXR5IGlzIG5vdCBhdmFpbGFibGUgb24gd2ViLicpO1xuICB9XG5cbiAgYXN5bmMgcmVhZFJzc2koX29wdGlvbnM6IERldmljZUlkT3B0aW9ucyk6IFByb21pc2U8UmVhZFJzc2lSZXN1bHQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlKCdyZWFkUnNzaSBpcyBub3QgYXZhaWxhYmxlIG9uIHdlYi4nKTtcbiAgfVxuXG4gIGFzeW5jIHJlYWQob3B0aW9uczogUmVhZE9wdGlvbnMpOiBQcm9taXNlPFJlYWRSZXN1bHQ+IHtcbiAgICBjb25zdCBjaGFyYWN0ZXJpc3RpYyA9IGF3YWl0IHRoaXMuZ2V0Q2hhcmFjdGVyaXN0aWMob3B0aW9ucyk7XG4gICAgY29uc3QgdmFsdWUgPSBhd2FpdCBjaGFyYWN0ZXJpc3RpYz8ucmVhZFZhbHVlKCk7XG4gICAgcmV0dXJuIHsgdmFsdWUgfTtcbiAgfVxuXG4gIGFzeW5jIHdyaXRlKG9wdGlvbnM6IFdyaXRlT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNoYXJhY3RlcmlzdGljID0gYXdhaXQgdGhpcy5nZXRDaGFyYWN0ZXJpc3RpYyhvcHRpb25zKTtcbiAgICBsZXQgZGF0YVZpZXc6IERhdGFWaWV3O1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy52YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRhdGFWaWV3ID0gaGV4U3RyaW5nVG9EYXRhVmlldyhvcHRpb25zLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YVZpZXcgPSBvcHRpb25zLnZhbHVlO1xuICAgIH1cbiAgICBhd2FpdCBjaGFyYWN0ZXJpc3RpYz8ud3JpdGVWYWx1ZVdpdGhSZXNwb25zZShkYXRhVmlldyk7XG4gIH1cblxuICBhc3luYyB3cml0ZVdpdGhvdXRSZXNwb25zZShvcHRpb25zOiBXcml0ZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjaGFyYWN0ZXJpc3RpYyA9IGF3YWl0IHRoaXMuZ2V0Q2hhcmFjdGVyaXN0aWMob3B0aW9ucyk7XG4gICAgbGV0IGRhdGFWaWV3OiBEYXRhVmlldztcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMudmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkYXRhVmlldyA9IGhleFN0cmluZ1RvRGF0YVZpZXcob3B0aW9ucy52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFWaWV3ID0gb3B0aW9ucy52YWx1ZTtcbiAgICB9XG4gICAgYXdhaXQgY2hhcmFjdGVyaXN0aWM/LndyaXRlVmFsdWVXaXRob3V0UmVzcG9uc2UoZGF0YVZpZXcpO1xuICB9XG5cbiAgYXN5bmMgcmVhZERlc2NyaXB0b3Iob3B0aW9uczogUmVhZERlc2NyaXB0b3JPcHRpb25zKTogUHJvbWlzZTxSZWFkUmVzdWx0PiB7XG4gICAgY29uc3QgZGVzY3JpcHRvciA9IGF3YWl0IHRoaXMuZ2V0RGVzY3JpcHRvcihvcHRpb25zKTtcbiAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IGRlc2NyaXB0b3I/LnJlYWRWYWx1ZSgpO1xuICAgIHJldHVybiB7IHZhbHVlIH07XG4gIH1cblxuICBhc3luYyB3cml0ZURlc2NyaXB0b3Iob3B0aW9uczogV3JpdGVEZXNjcmlwdG9yT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBhd2FpdCB0aGlzLmdldERlc2NyaXB0b3Iob3B0aW9ucyk7XG4gICAgbGV0IGRhdGFWaWV3OiBEYXRhVmlldztcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMudmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkYXRhVmlldyA9IGhleFN0cmluZ1RvRGF0YVZpZXcob3B0aW9ucy52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFWaWV3ID0gb3B0aW9ucy52YWx1ZTtcbiAgICB9XG4gICAgYXdhaXQgZGVzY3JpcHRvcj8ud3JpdGVWYWx1ZShkYXRhVmlldyk7XG4gIH1cblxuICBhc3luYyBzdGFydE5vdGlmaWNhdGlvbnMob3B0aW9uczogUmVhZE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjaGFyYWN0ZXJpc3RpYyA9IGF3YWl0IHRoaXMuZ2V0Q2hhcmFjdGVyaXN0aWMob3B0aW9ucyk7XG4gICAgY2hhcmFjdGVyaXN0aWM/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYXJhY3RlcmlzdGljdmFsdWVjaGFuZ2VkJywgdGhpcy5vbkNoYXJhY3RlcmlzdGljVmFsdWVDaGFuZ2VkQ2FsbGJhY2spO1xuICAgIGNoYXJhY3RlcmlzdGljPy5hZGRFdmVudExpc3RlbmVyKCdjaGFyYWN0ZXJpc3RpY3ZhbHVlY2hhbmdlZCcsIHRoaXMub25DaGFyYWN0ZXJpc3RpY1ZhbHVlQ2hhbmdlZENhbGxiYWNrKTtcbiAgICBhd2FpdCBjaGFyYWN0ZXJpc3RpYz8uc3RhcnROb3RpZmljYXRpb25zKCk7XG4gIH1cblxuICBwcml2YXRlIG9uQ2hhcmFjdGVyaXN0aWNWYWx1ZUNoYW5nZWRDYWxsYmFjayA9IHRoaXMub25DaGFyYWN0ZXJpc3RpY1ZhbHVlQ2hhbmdlZC5iaW5kKHRoaXMpO1xuXG4gIHByaXZhdGUgb25DaGFyYWN0ZXJpc3RpY1ZhbHVlQ2hhbmdlZChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBjaGFyYWN0ZXJpc3RpYyA9IGV2ZW50LnRhcmdldCBhcyBCbHVldG9vdGhSZW1vdGVHQVRUQ2hhcmFjdGVyaXN0aWM7XG4gICAgY29uc3Qga2V5ID0gYG5vdGlmaWNhdGlvbnwke2NoYXJhY3RlcmlzdGljLnNlcnZpY2U/LmRldmljZS5pZH18JHtjaGFyYWN0ZXJpc3RpYy5zZXJ2aWNlPy51dWlkfXwke2NoYXJhY3RlcmlzdGljLnV1aWR9YDtcbiAgICB0aGlzLm5vdGlmeUxpc3RlbmVycyhrZXksIHtcbiAgICAgIHZhbHVlOiBjaGFyYWN0ZXJpc3RpYy52YWx1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHN0b3BOb3RpZmljYXRpb25zKG9wdGlvbnM6IFJlYWRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY2hhcmFjdGVyaXN0aWMgPSBhd2FpdCB0aGlzLmdldENoYXJhY3RlcmlzdGljKG9wdGlvbnMpO1xuICAgIGF3YWl0IGNoYXJhY3RlcmlzdGljPy5zdG9wTm90aWZpY2F0aW9ucygpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaWx0ZXJzKG9wdGlvbnM/OiBSZXF1ZXN0QmxlRGV2aWNlT3B0aW9ucyk6IEJsdWV0b290aExFU2NhbkZpbHRlcltdIHtcbiAgICBjb25zdCBmaWx0ZXJzOiBCbHVldG9vdGhMRVNjYW5GaWx0ZXJbXSA9IFtdO1xuICAgIGZvciAoY29uc3Qgc2VydmljZSBvZiBvcHRpb25zPy5zZXJ2aWNlcyA/PyBbXSkge1xuICAgICAgZmlsdGVycy5wdXNoKHtcbiAgICAgICAgc2VydmljZXM6IFtzZXJ2aWNlXSxcbiAgICAgICAgbmFtZTogb3B0aW9ucz8ubmFtZSxcbiAgICAgICAgbmFtZVByZWZpeDogb3B0aW9ucz8ubmFtZVByZWZpeCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoKG9wdGlvbnM/Lm5hbWUgfHwgb3B0aW9ucz8ubmFtZVByZWZpeCkgJiYgZmlsdGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGZpbHRlcnMucHVzaCh7XG4gICAgICAgIG5hbWU6IG9wdGlvbnMubmFtZSxcbiAgICAgICAgbmFtZVByZWZpeDogb3B0aW9ucy5uYW1lUHJlZml4LFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREZXZpY2VGcm9tTWFwKGRldmljZUlkOiBzdHJpbmcpOiBCbHVldG9vdGhEZXZpY2Uge1xuICAgIGNvbnN0IGRldmljZSA9IHRoaXMuZGV2aWNlTWFwLmdldChkZXZpY2VJZCk7XG4gICAgaWYgKGRldmljZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RldmljZSBub3QgZm91bmQuIENhbGwgXCJyZXF1ZXN0RGV2aWNlXCIsIFwicmVxdWVzdExFU2NhblwiIG9yIFwiZ2V0RGV2aWNlc1wiIGZpcnN0LicpO1xuICAgIH1cbiAgICByZXR1cm4gZGV2aWNlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRCbGVEZXZpY2UoZGV2aWNlOiBCbHVldG9vdGhEZXZpY2UpOiBCbGVEZXZpY2Uge1xuICAgIGNvbnN0IGJsZURldmljZTogQmxlRGV2aWNlID0ge1xuICAgICAgZGV2aWNlSWQ6IGRldmljZS5pZCxcbiAgICAgIC8vIHVzZSB1bmRlZmluZWQgaW5zdGVhZCBvZiBudWxsIGlmIG5hbWUgaXMgbm90IGF2YWlsYWJsZVxuICAgICAgbmFtZTogZGV2aWNlLm5hbWUgPz8gdW5kZWZpbmVkLFxuICAgIH07XG4gICAgcmV0dXJuIGJsZURldmljZTtcbiAgfVxufVxuIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bldpdGhUaW1lb3V0KHByb21pc2U6IFByb21pc2U8dW5rbm93bj4sIHRpbWU6IG51bWJlciwgZXhjZXB0aW9uOiBzeW1ib2wpOiBQcm9taXNlPHVua25vd24+IHtcbiAgbGV0IHRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PjtcbiAgcmV0dXJuIFByb21pc2UucmFjZShbXG4gICAgcHJvbWlzZSxcbiAgICBuZXcgUHJvbWlzZSgoXywgcmVqZWN0KSA9PiB7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KGV4Y2VwdGlvbiksIHRpbWUpO1xuICAgIH0pLFxuICBdKS5maW5hbGx5KCgpID0+IGNsZWFyVGltZW91dCh0aW1lcikpO1xufVxuIl0sIm5hbWVzIjpbIkJsdWV0b290aExlV2ViIiwiV2ViUGx1Z2luIiwiY29uc3RydWN0b3IiLCJkZXZpY2VNYXAiLCJNYXAiLCJkaXNjb3ZlcmVkRGV2aWNlcyIsInNjYW4iLCJERUZBVUxUX0NPTk5FQ1RJT05fVElNRU9VVCIsIm9uQWR2ZXJ0aXNlbWVudFJlY2VpdmVkQ2FsbGJhY2siLCJ0aGlzIiwib25BZHZlcnRpc2VtZW50UmVjZWl2ZWQiLCJiaW5kIiwib25EaXNjb25uZWN0ZWRDYWxsYmFjayIsIm9uRGlzY29ubmVjdGVkIiwib25DaGFyYWN0ZXJpc3RpY1ZhbHVlQ2hhbmdlZENhbGxiYWNrIiwib25DaGFyYWN0ZXJpc3RpY1ZhbHVlQ2hhbmdlZCIsImFzeW5jIiwibmF2aWdhdG9yIiwiYmx1ZXRvb3RoIiwidW5hdmFpbGFibGUiLCJnZXRBdmFpbGFiaWxpdHkiLCJ2YWx1ZSIsIm9wdGlvbnMiLCJmaWx0ZXJzIiwiZ2V0RmlsdGVycyIsImRldmljZSIsInJlcXVlc3REZXZpY2UiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJvcHRpb25hbFNlcnZpY2VzIiwiYWNjZXB0QWxsRGV2aWNlcyIsInNldCIsImlkIiwiZ2V0QmxlRGV2aWNlIiwicmVxdWVzdEJsZURldmljZU9wdGlvbnMiLCJzdG9wTEVTY2FuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXF1ZXN0TEVTY2FuIiwiYWNjZXB0QWxsQWR2ZXJ0aXNlbWVudHMiLCJrZWVwUmVwZWF0ZWREZXZpY2VzIiwiYWxsb3dEdXBsaWNhdGVzIiwiZXZlbnQiLCJkZXZpY2VJZCIsImhhcyIsIl9hIiwicmVzdWx0IiwibG9jYWxOYW1lIiwibmFtZSIsInJzc2kiLCJ0eFBvd2VyIiwibWFudWZhY3R1cmVyRGF0YSIsIm1hcFRvT2JqZWN0Iiwic2VydmljZURhdGEiLCJ1dWlkcyIsIl9iIiwibWFwIiwid2ViVVVJRFRvU3RyaW5nIiwibm90aWZ5TGlzdGVuZXJzIiwiYWN0aXZlIiwic3RvcCIsImRldmljZXMiLCJnZXREZXZpY2VzIiwiZmlsdGVyIiwiZGV2aWNlSWRzIiwiaW5jbHVkZXMiLCJfb3B0aW9ucyIsImdhdHQiLCJjb25uZWN0ZWQiLCJnZXREZXZpY2VGcm9tTWFwIiwidGltZW91dEVycm9yIiwiU3ltYm9sIiwiRXJyb3IiLCJ0aW1lb3V0IiwicHJvbWlzZSIsInRpbWUiLCJleGNlcHRpb24iLCJ0aW1lciIsIlByb21pc2UiLCJyYWNlIiwiXyIsInJlamVjdCIsInNldFRpbWVvdXQiLCJmaW5hbGx5IiwiY2xlYXJUaW1lb3V0IiwicnVuV2l0aFRpbWVvdXQiLCJjb25uZWN0IiwiZXJyb3IiLCJkaXNjb25uZWN0Iiwia2V5IiwidGFyZ2V0Iiwic2VydmljZXMiLCJnZXRQcmltYXJ5U2VydmljZXMiLCJibGVTZXJ2aWNlcyIsInNlcnZpY2UiLCJjaGFyYWN0ZXJpc3RpY3MiLCJnZXRDaGFyYWN0ZXJpc3RpY3MiLCJibGVDaGFyYWN0ZXJpc3RpY3MiLCJjaGFyYWN0ZXJpc3RpYyIsInB1c2giLCJ1dWlkIiwicHJvcGVydGllcyIsImdldFByb3BlcnRpZXMiLCJkZXNjcmlwdG9ycyIsImdldERlc2NyaXB0b3JzIiwiZGVzY3JpcHRvciIsImJyb2FkY2FzdCIsInJlYWQiLCJ3cml0ZVdpdGhvdXRSZXNwb25zZSIsIndyaXRlIiwibm90aWZ5IiwiaW5kaWNhdGUiLCJhdXRoZW50aWNhdGVkU2lnbmVkV3JpdGVzIiwicmVsaWFibGVXcml0ZSIsIndyaXRhYmxlQXV4aWxpYXJpZXMiLCJnZXRQcmltYXJ5U2VydmljZSIsImdldENoYXJhY3RlcmlzdGljIiwiZ2V0RGVzY3JpcHRvciIsInJlYWRWYWx1ZSIsImRhdGFWaWV3IiwiaGV4U3RyaW5nVG9EYXRhVmlldyIsIndyaXRlVmFsdWVXaXRoUmVzcG9uc2UiLCJ3cml0ZVZhbHVlV2l0aG91dFJlc3BvbnNlIiwid3JpdGVWYWx1ZSIsInN0YXJ0Tm90aWZpY2F0aW9ucyIsInN0b3BOb3RpZmljYXRpb25zIiwibmFtZVByZWZpeCIsImdldCJdLCJzb3VyY2VSb290IjoiIn0=