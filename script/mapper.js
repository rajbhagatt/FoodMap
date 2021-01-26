	var zoom=5;
	var latstart=22.76;
	var longstart=78;
	var markers;
	var map = L.map('map').setView([latstart, longstart], zoom);
	
	var googleLayer = new L.Google('HYBRID');
	map.addLayer(googleLayer,true);

	var ReqData=BData;
	function boxchange()
	{
	
	map.removeLayer(markers);
	
	obj_1 = document.getElementById("foodbox");
	sel_1 = (obj_1.options[obj_1.selectedIndex].value);
	
	ReqData_1={};
	ReqData_1['crs']=BData['crs']
	ReqData_1['name']=BData['name']
	ReqData_1['type']=BData['type']
	reqlist=[];
	
	for (i=0; i<BData["features"].length; i++)
	{
	if (sel_1=="All")
	{
		reqlist.push(BData["features"][i])
	}
	else
	{
		if (String(BData["features"][i]["properties"]["Name"]).search(sel_1)!=-1)
		{
			reqlist.push(BData["features"][i])
		}
	}
	}
	ReqData_1['features']=reqlist;
	
	obj_2 = document.getElementById("statebox");
	sel_2 = (obj_2.options[obj_2.selectedIndex].value);
	
	ReqData={};
	ReqData['crs']=ReqData_1['crs']
	ReqData['name']=ReqData_1['name']
	ReqData['type']=ReqData_1['type']
	reqlist=[];
	
	for (i=0; i<ReqData_1["features"].length; i++)
	{
	
	if (sel_2=="All")
	{
		reqlist.push(ReqData_1["features"][i])
	}
	else
	{
		if (String(ReqData_1["features"][i]["properties"]["State"]).search(sel_2)!=-1)
		{
		
			reqlist.push(ReqData_1["features"][i])
		}
	}
	}
	ReqData['features']=reqlist;
	
	
	drawmap();
		
	}
	
	function drawmap()
	{
		markers = L.markerClusterGroup();
		
		var geoJsonLayer = L.geoJson(ReqData, {
			onEachFeature: function (feature, layer) {
				layer.bindPopup("<table  style='width:500px;height:100%;font-size:12px'><tr><td><b>Name:</b> "+feature.properties.Name +"<br><br><b>Place:</b> "+feature.properties.Place+"<br><br><b>State:</b> "+feature.properties.State+"<br><br><b>About:</b> "+feature.properties.About+"<br><br><a href="+feature.properties.Link+">Read More </a></td><td ><img src=data/Pics/"+String(feature.properties.SlNo)+'.jpg  style="width:200px;height:250px;"></td></tr></table>', {
				maxWidth : 600
				}
				);
			}
		});
		markers.addLayer(geoJsonLayer);

		map.addLayer(markers);
	
	}
	
	drawmap();