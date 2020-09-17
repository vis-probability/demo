var novaDist,bounds,width,height,area,nump,cont,cor,p,markerCircle,opcoes=[],anoSelecionado,featurename,mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado,layerTuto3;
var mapVis03 = L.map('vis03').setView([-8.305448,-37.822426], 8);
//var gradesDot=[0,105,210,315,420,525,630,735,842];
var gradesDot=[0,30,60,90,120,150,180,210,240];
var myRenderer = L.canvas({ padding: 0.01 });
var LayerDotMap,LayerTaxi,pontos,pontos2,pontos3;
var dots=[],dotsZ1=[],dotsZ2=[],dotsZ3=[],dotsTaxi=[],dotsZ1Taxi=[],dotsZ2Taxi=[],dotsZ3Taxi=[];

//-- MAPA DE PONTOS DA ETAPA DE TUTORIAL DO USUÁRIO. --
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png?', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 18
}).addTo(mapVis03);
mapVis03.on('zoomend', function() {
  Vis03TutorialFunction(dataset);
});
//-- DIV INFO DO MAPA CONTROLADO --
var infoVis03=L.control();
infoVis03.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
//-- DIV LEGENDA DO MAPA CONTROLADO --
var legendVis03 = L.control({position: 'bottomright'});
legendVis03.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (gradesDot.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:'+colorD(gradesDot[i])+'; background:'+colorD(gradesDot[i])+'"></i>'+gradesDot[i]+'</br>';
  }
  return div;
};
legendVis03.addTo(mapVis03);
var dots;
var tentativa=[];
//-- FUNÇÃO QUE DESENHA E CONTROLA OS PONTOS NO MAPA --
function Vis03TutorialFunction(dataset){
  if (opcoes.length==0) {
    opcoes=["Recife","Caruaru"];
  }
  if (dots.length==0) {
    InicioDot();
  }
  if(layerTuto3!= null){
    layerTuto3.clearLayers();
    pontos.clearLayers();
  }
  //dots = [];
  layerTuto3 =L.geoJson(dataset,
    {
      style: function(feature){
        if(opcoes.includes(feature.properties.name)){
          if(opcoes[0]==feature.properties.name){
            return {
              weight: 3.5,
              opacity: 1,
              fillOpacity: 0,
              color: '#c51b7d'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillOpacity: 0,
              color: '#053061'
            };            
          }
        }else{
          return{
            weight:0.8,
            opacity: 0.5,
            fillOpacity: 0,
            color: 'black',
          };
        }
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(""+feature.properties.name);
        layer.on('mouseover', function (e) {
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            this.closePopup();
        });
  }}).addTo(mapVis03);
  var nZoom= mapVis03.getZoom();
  if(nZoom>11){
    pontos = L.layerGroup(dotsZ3);
  }else if(nZoom>9){
    pontos = L.layerGroup(dotsZ2);
  }else if(nZoom>8){
    pontos = L.layerGroup(dotsZ1);
  }else{
    pontos = L.layerGroup(dots);
  }
  pontos.addTo(mapVis03);
  infoVis03.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  infoVis03.addTo(mapVis03);
}

function InicioDot(){
  var recife;
  var pointsdots = [];
  var xMin,yMin,xMax,yMax;
  var contdots=0;
  L.geoJson(dataset,{
    onEachFeature: async function (feature, layer) {
        await sleep(3000);

        novaDist= dotMapPrep(getDis(feature.properties.name));
        
        //console.log(Math.max.apply(Math, getDis(feature.properties.name)));
        bounds = layer.getBounds();
        width = Math.abs(bounds._northEast.lng - bounds._southWest.lng);
        height = Math.abs(bounds._northEast.lat - bounds._southWest.lat);
        area= (turf.area(feature.geometry)/10000000);     
        //area= area/3;
          xMin = Infinity;
          yMin = Infinity;
          xMax = -Infinity;
          yMax = -Infinity;
        /*var LatLngs=layer.getLatLngs()[0];  
        LatLngs.forEach(p=>{
          var nova= map.unproject([p.lat,p.lng]);
          p.lat=nova.lat;
          p.lng=nova.lng;
        });*/
        
        layer.getLatLngs()[0].forEach(function(p,i){
            if (p.lat<xMin) xMin = p.lat;
            if (p.lat>xMax) xMax = p.lat;
            if (p.lng<yMin) yMin = p.lng;
            if (p.lng>yMax) yMax = p.lng;
        });
        var widthh = layer.getBounds().getNorth()-layer.getBounds().getSouth();//(xMax - xMin); 
        var heightt = layer.getBounds().getEast()-layer.getBounds().getWest();//(yMax - yMin);
        var polygon=layer.getLatLngs()[0];
        //console.log(widthh+'-'+heightt);
                  //console.log(bounds);
        //console.log(width+" "+height);
        //console.log(feature.properties.name);
        var enveloped = turf.envelope(feature);
        var a=turf.bbox(enveloped);
        var grid = turf.pointGrid(a,2);
        //console.log(grid.features.length);
        var pointsGrid=[];
        grid.features.forEach(function(d){
            var aux=d.geometry.coordinates;
            var q=L.latLng(aux[1],aux[0]);
            //if (leafletPip.pointInLayer(q, L.geoJSON(layer.toGeoJSON()), true).length > 0) {console.log('circulo dentro');}
            //p = L.latLng(bounds._southWest.lat + Math.random() * height, bounds._southWest.lng + Math.random() * width);
            if (leafletPip.pointInLayer(q, L.geoJSON(layer.toGeoJSON()), true).length > 0) {
              pointsGrid.push(q);
            }
        });
        var indice=0;
        pointsGrid=shuffle(pointsGrid);
        var pdisponiveis= pointsGrid.length;
        novaDist.forEach(function(d){
          cor= colorD(d[0]);
          var limite=Math.round((pointsGrid.length)*d[1]);
          var i= indice;
          var l=limite+indice;
          for (i; i<l; i++) {
              if (pdisponiveis>0) {
                dots.push(L.circleMarker(pointsGrid[i], {radius: 1.3, weight: 1,fillColor: cor,fillOpacity:1, color: cor,renderer: myRenderer}));
                dotsZ1.push(L.circleMarker(pointsGrid[i], {radius: 2.2, weight: 1,fillColor: cor,fillOpacity:1, color: cor,renderer: myRenderer}));
                dotsZ2.push(L.circleMarker(pointsGrid[i], {radius: 3.0, weight: 1,fillColor: cor,fillOpacity:1, color: cor,renderer: myRenderer}));
                dotsZ3.push(L.circleMarker(pointsGrid[i], {radius: 4.6, weight: 1,fillColor: cor,fillOpacity:1, color: cor,renderer: myRenderer}));
                pdisponiveis--; 
                //indice++;              
              }
          }
          indice+=limite;
        });
        if(feature.properties.name=="Xexéu"){
          //console.log(dataset);
          Vis03TutorialFunction(dataset);
        }
    }
  });
}
InicioDot();