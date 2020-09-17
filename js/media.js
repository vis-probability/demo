var filterbymouth,filterbytri,alpha=0,left=60,right=100,database,interOn,mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado,opcoes=[],GeoLayer,LayerRange,layerTuto1,layerTuto2,layerTuto3,layerTuto4,LayerTaxi,dataset,max,featurename,selecionados=[],medias=[],hops=true,mediaLayer;
var sorteados;
//var mapMedia = L.map('vis4',{ zoomControl: false }).setView([-8.305448,-37.822426], 8);
var mapVis04 = L.map('vis04',{ zoomControl: false }).setView([-8.305448,-37.822426], 8);
//var mapTaxi= L.map('vistaxi',{ zoomControl: false }).setView([40.752866,-73.986023], 13);
var legendMedia = L.control({position: 'bottomright'});
//var grades=[0,20,40,60,80,100,120,140,160];
var grades=[0,30,60,90,120,150,180,210,240];
var LayerMedia,GeoLayer2,GeoLayer3,mesmedia,mesmediaN;
mapVis04.doubleClickZoom.disable();
mapVis04.scrollWheelZoom.disable();
var infoMedia = L.control();

//-- MAPA DE MÉDIA COM ANIMAÇÃO DA ETAPA DE PERGUNTAS AO USUÁRIO. --
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png?', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 18
}).addTo(mapVis04);

//-- DIV INFO DO MAPA CONTROLADO --
var infoVis04=L.control();
infoVis04.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

//-- DIV LEGENDA DO MAPA CONTROLADO --
var legendVis04 = L.control({position: 'bottomright'});
legendVis04.onAdd = function (mapMedia) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (grades.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:'+colorM(grades[i])+'; background:'+colorM(grades[i])+'"></i>'+grades[i]+'</br>';
  }
  return div;
};
legendVis04.addTo(mapVis04);

//-- FUNÇÃO QUE DESENHA E CONTROLA OS PONTOS NO MAPA --
function Vis04TutorialFunction(dados){
  var maximo=0;
  if(layerTuto4!= null){
    layerTuto4.clearLayers();
  }
  layerTuto4= L.geoJson(dados,
    {style: function(feature){
      if(mesmedia!=undefined){
            var distdataMes=[];
            database.forEach(function(d,i){
              if (d.name==feature.properties.name && d.Mês==mesmedia){
                  distdataMes.push(SomaDias(d));
              }
            });
            var probArea= new distribuicaoTeste(distdataMes,0);
      }else{
        var probArea= new distribuicaoTeste(getDis(feature.properties.name),0);
      }
      var media= probArea.media().toFixed(2);
      if(opcoes.includes(feature.properties.name)){
        if(opcoes[0]==feature.properties.name){
          return {
            weight: 3.5,
            opacity: 1,
            fillColor: colorM(media),
            dashArray: '3',
            fillOpacity: 0.9,
            color: '#c51b7d'
          };
        }else{
          return {
            weight: 3.5,
            opacity: 1,
            fillColor: colorM(media),
            dashArray: '3',
            fillOpacity: 0.9,
            color: '#053061'
          };            
        }
      }else{      
        return {
            weight: 0.5,
            opacity: 1,
            fillColor: colorM(media),
            color: 'black',
            fillOpacity: 0.9
        };
      }

      },onEachFeature: function (feature, layer) {
          if(mesmedia!=undefined){
            var distdataMes=[];
            database.forEach(function(d,i){
              if (d.name==feature.properties.name && d.Mês==mesmedia){
                  distdataMes.push(SomaDias(d));
              }
            });
            var probArea= new distribuicaoTeste(distdataMes,0);
          }else{
            var probArea= new distribuicaoTeste(getDis(feature.properties.name),0);
          }
          var media= probArea.media().toFixed(2);
          layer.bindPopup(""+feature.properties.name+": "+media);
          layer.on('mouseover', function (e) {
              highlightFeature(e);
              this.openPopup();
          });
          layer.on('mouseout', function (e) {
              layerTuto4.resetStyle(e.target);
              this.closePopup();
          });
        }
    }).addTo(mapVis04);
  if(mesmedia!=undefined){
    infoVis04.update = function (props) {
      this._div.innerHTML= '<h5>Information based on the state of PE Brazil.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for the month of '+mounthEn(mesmediaN)+' in the period.');
    };
  }else{
    infoVis04.update = function (props) {
      this._div.innerHTML= infoprops(props);
    };
  }
  infoVis04.addTo(mapVis04);
}