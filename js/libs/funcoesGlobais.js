var sucesso=0;
function refresh(){
  if(sucesso==2){
      window.location.reload(true);
  }
}
function mounthEn(mesmediaN){
        if(mesmediaN==0){
          return "Jan";
        }else if(mesmediaN==1){
          return "Feb";
        }else if(mesmediaN==2){
          return "Mar";
        }else if(mesmediaN==3){
          return "Apr";
        }else if(mesmediaN==4){
          return "May";
        }else if(mesmediaN==5){
          return "Jun";
        }else if(mesmediaN==6){
          return "Jul";
        }else if(mesmediaN==7){
          return "Aug";
        }else if(mesmediaN==8){
          return "Sep";
        }else if(mesmediaN==9){
          return "Oct";
        }else if(mesmediaN==10){
          return "Nov";
        }else if(mesmediaN==11){
          return "Dec";
        }
}
var maior=0,menor=+Infinity;
function distribuicaoNYC(id){
  var distdataMes=[];
  databasetaxi.forEach(function(d,i){
    distdataMes.push(d[0][id]);
    if(maior<Number(d[0][id])){
      maior=d[0][id];
    }
    if(menor>Number(d[0][id])){
      menor=d[0][id];
    }
  });
  return distdataMes;
}

// PREPARA A DISTRUIBUICAO DE CADA ÁREA EM DIAS 365 PARA CADA ANO NO DATASET.
function distribuicaoAno(featurename){
  var distdataAno=[];
  var soma=0,soma1=0,soma2=0;
  if(mesSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Ano==anoSelecionado && d.Mês==mesSelecionado){
        var dias=diasToArray(d);
        dias.forEach(function(d,i){
                    distdataAno.push(d);
                  });
      }
    });
  }else if(trimestreSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1){
        if( d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            var dias=diasToArray(d);
            dias.forEach(function(d,i){
              distdataAno.push(d);
            });
          }
        }
      }else if(trimestreSelecionado==2){
        if( d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            var dias=diasToArray(d);
            dias.forEach(function(d,i){
              distdataAno.push(d);
            });
          }
        }
      }else if(trimestreSelecionado==3){
        if( d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            var dias=diasToArray(d);
            dias.forEach(function(d,i){
              distdataAno.push(d);
            });
          }
        }
      }else{
        if( d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            var dias=diasToArray(d);
            dias.forEach(function(d,i){
              distdataAno.push(d);
            });
          }
        }
      }
    });
  }else if(diaSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Ano==anoSelecionado){
          distdataAno.push(d[diaSelecionado]);
      }
    });
  }else if(anoSelecionado!=null){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Ano==anoSelecionado){
          distdataAno.push(SomaDias(d));
      }
    });
  }else{
    database.forEach(function(d,i){
      if (d.name==featurename) {
        if(d.Ano==2016){
          soma+=SomaDias(d);
        }else if (d.Ano==2017) {
          soma1+=SomaDias(d);
        }else{
          soma2+=SomaDias(d);
        }
      }
    });
    distdataAno.push(soma);
    distdataAno.push(soma1);
    distdataAno.push(soma2);
  }
  return distdataAno;
}
// PREPARA A DISTRUIBUICAO DE DIAS PARA MESES DE 365 PARA 12 POR ANO.
function SomaDias(d){
  var soma=0;
  if(d.Mês=='Abr'||d.Mês=='Jun'||d.Mês=='Set'||d.Mês=='Nov'){
    for (var i = 1; i < 31; i++) {
      soma=soma+Number(d[i]);
    }
  }else if(d.Mês=='Fev'){
    for (var i = 1; i < 29; i++) {
      soma+=Number(d[i]);
    }
  }else{
    for (var i = 1; i < 32; i++) {
      soma=soma+Number(d[i]);
    }
  }
  return soma;
}
// PREPARA A DISTRUIBUICAO PARA TRIMESTRES JUNTANDO MESES DE 12 PARA 3.
function distribuicaoTri(featurename){
  var distdataTrimestre=[];
  if(anoSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1){
        if( d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else if(trimestreSelecionado==2){
        if( d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else if(trimestreSelecionado==3){
        if( d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else{
        if( d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }
    });
  }else if(diaSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1){
        if( d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar' ){
          if (d.name==featurename){
            distdataTrimestre.push(d[diaSelecionado]);
          }
        }
      }else if(trimestreSelecionado==2){
        if( d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun' ){
          if (d.name==featurename){
            distdataTrimestre.push(d[diaSelecionado]);
          }
        }
      }else if(trimestreSelecionado==3){
        if( d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set' ){
          if (d.name==featurename){
            distdataTrimestre.push(d[diaSelecionado]);
          }
        }
      }else{
        if( d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez' ){
          if (d.name==featurename){
            distdataTrimestre.push(d[diaSelecionado]);
          }
        }
      }
    });
    /*database.forEach(function(d,i){
      if (d.name==featurename && d.Mês==mesSelecionado){
          distdataTrimestre.push(SomaDias(d[diaSelecionado]));
      }
    });*/
  }else if(trimestreSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1){
        if(d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar'){
          if (d.name==featurename){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else if(trimestreSelecionado==2){
        if(d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun'){
          if (d.name==featurename){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else if(trimestreSelecionado==3){
        if(d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set'){
          if (d.name==featurename){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else{
        if(d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez'){
          if (d.name==featurename){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }
    });
  }else{
    database.forEach(function(d,i){
      if (d.name==featurename){
          distdataTrimestre.push(SomaDias(d));
      }
    });
  }
  return distdataTrimestre;
}
// PREPARA A DISTRUIBUICAO PARA MESES 12 POR ANO.
function distribuicaoMes(featurename){
  var distdataMes=[];
  if(anoSelecionado!=undefined){
    if (mesSelecionado==undefined) {
      database.forEach(function(d,i){
        if (d.name==featurename && d.Ano==anoSelecionado){
            distdataMes.push(SomaDias(d));
        }
      });  
    }else{
      database.forEach(function(d,i){
        if (d.name==featurename && d.Mês==mesSelecionado && d.Ano==anoSelecionado){
            distdataMes.push(SomaDias(d));
        }
      });
    }
  }else if(diaSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Mês==mesSelecionado){
          distdataMes.push(SomaDias(d[diaSelecionado]));
      }
    });
  }else if(mesSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Mês==mesSelecionado){
          distdataMes.push(SomaDias(d));
      }
    });
  }else{

    database.forEach(function(d,i){
      if(d.name==featurename){
          var m= SomaDias(d);
          distdataMes.push(Number(m.toFixed(2)));
      }
    });
  }
  return distdataMes;
}
// PREPARA A DISTRUIBUICAO DE DIAS PARA MESES DE 365 PARA 12 POR ANO.
function diasToArray(d){
  var diasArray=[];
  if(d.Mês=='Abr'||d.Mês=='Jun'||d.Mês=='Set'||d.Mês=='Nov'){
    for (var i = 1; i < 31; i++) {
      diasArray.push(d[i]);
    }
  }else if(d.Mês=='Fev'){
    for (var i = 1; i < 29; i++) {
      diasArray.push(d[i]);
    }
  }else{
    for (var i = 1; i < 32; i++) {
      diasArray.push(d[i]);
    }
  }
  return diasArray;
}
// PREPARA A DISTRUIBUICAO DE DIAS.
function distribuicaoDia(featurename){
  var distdataDia=[];
  if(anoSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Ano==anoSelecionado){
        if(diaSelecionado==31){
          if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }else{
          distdataDia.push(d[diaSelecionado]);
        }
      }
    });
  }else if(trimestreSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1 && d.name==featurename){
        if( d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar' ){
          if(diaSelecionado==31){
            if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

            }else{
              distdataDia.push(d[diaSelecionado]);
            }
          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }
      }else if(trimestreSelecionado==2 && d.name==featurename){
        if( d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun' ){
          if(diaSelecionado==31){
            if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

            }else{
              distdataDia.push(d[diaSelecionado]);
            }
          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }
      }else if(trimestreSelecionado==3 && d.name==featurename){
        if( d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set' ){
          if(diaSelecionado==31){
            if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

            }else{
              distdataDia.push(d[diaSelecionado]);
            }
          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }
      }else{
        if( d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez' ){
          if (d.name==featurename){
            if(diaSelecionado==31){
              if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

              }else{
                distdataDia.push(d[diaSelecionado]);
              }
            }else{
              distdataDia.push(d[diaSelecionado]);
            }
          }
        }
      }
    });
  }else if(mesSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Mês==mesSelecionado){
        if(diaSelecionado==31){
          if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }else{
          distdataDia.push(d[diaSelecionado]);
        }
      }
    });
  }else if(diaSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename) {
        if(diaSelecionado==31){
          if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }else{
          distdataDia.push(d[diaSelecionado]);
        }
      }
    });
  }else{
    database.forEach(function(d,i){
      if (d.name==featurename) {
        diasToArray(d).forEach(function(d,i){
          distdataDia.push(d);
        });
      }
    });
  }
  return distdataDia;
}
// PREPARA A DISTRUIBUICAO DE PONTOS PARA O MAP DE PONTOS.
function dotMapPrep(dist){
  var round=[];
  var uniqueArray;
  dist.forEach(function(d,i){
    round.push(Math.ceil(d/10)*10);
  });
  uniqueArray = round.filter(function(item, pos) {
      return round.indexOf(item) == pos;
  });
  var probs = {};
  round.forEach(function(x) {
    var num=(probs[x] || 0)+1;
    probs[x]=num;
  });
    for(var key in probs){
      probs[key] = probs[key] / round.length;
    }
  uniqueArray.forEach(function(d,i){
    uniqueArray[i]=[d,probs[d]];
  });
  return uniqueArray;
}
// PREPARA A INFORMAÇÃO DO MAPA COM BASE NO DATA SET E SE TIVER ALGUM FILTRO DE MES, TRIMESTRE, OU DIA ATIVADO.
function infoprops(props){
    if(featurename!=undefined){
      if(anoSelecionado!=undefined){
        if(mesSelecionado!=undefined){
          return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+mesSelecionado+'/'+anoSelecionado+'.');
        }else if(trimestreSelecionado!=undefined){
          if(diaSelecionado!=undefined){
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for '+diaSelecionado+' days of '+trimestreSelecionado+'ºtrimestre/'+anoSelecionado+'.');
          }else{
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o '+trimestreSelecionado+'º quarter of '+anoSelecionado+'.');
          }
        }else if(diaSelecionado!=undefined){
          return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for '+diaSelecionado+' days of '+anoSelecionado+'.');
        }else{
          return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+anoSelecionado+'.');
        }
      }else if(trimestreSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for '+diaSelecionado+' days of'+trimestreSelecionado+'º quarters in the period.');
        }else{
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for '+trimestreSelecionado+' quarters in the period.');
        }
      }else if(mesSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for '+diaSelecionado+' days of the month of'+mesSelecionado+' in the period.');
        }else{
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for mês de '+mesSelecionado+' in the period.');
        }
      }else if(diaSelecionado!==undefined){
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for '+diaSelecionado+' days of the month in the period.');
      }else{
          return '<h4> Information based on '+featurename+'.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores referentes a todo o período.');
      }
    }else{
      if(anoSelecionado!=undefined){

        if(mesSelecionado!=undefined){
          return '<h5>Information based on the state of PE Brazil.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+mesSelecionado+'/'+anoSelecionado+'.');
        }else if(trimestreSelecionado!=undefined){
          if(diaSelecionado!=undefined){
            return '<h5>Information based on the state of PE Brazil.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for '+diaSelecionado+' days of '+trimestreSelecionado+'ºtrimestre/'+anoSelecionado+'.');
          }else{
            return '<h5>Information based on the state of PE Brazil.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o '+trimestreSelecionado+'º quarter of '+anoSelecionado+'.');
          }
        }else if(diaSelecionado!=undefined){
          return '<h5>Information based on the state of PE Brazil.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for '+diaSelecionado+' days of '+anoSelecionado+'.');
        }else{
          return '<h5>Information based on the state of PE Brazil.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+anoSelecionado+'.');
        }

      }else if(trimestreSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Information based on the state of PE Brazil.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for '+diaSelecionado+' days of'+trimestreSelecionado+'º quarters in the period.');
        }else{
            return '<h5>Information based on the state of PE Brazil.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for '+trimestreSelecionado+' quarters in the period.');
        }
      }else if(mesSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Information based on the state of PE Brazil.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for '+diaSelecionado+' days of the month of'+mesSelecionado+' in the period.');
        }else{
            return '<h5>Information based on the state of PE Brazil.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for the month of '+mesSelecionado+' in the period.');
        }
      }else if(diaSelecionado!==undefined){
            return '<h5>Information based on the state of PE Brazil.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for '+diaSelecionado+' days of the month in the period.');
      }else{
          return '<h4> Information based on the state of PE Brazil.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Values for the entire period.');
      }
    }
}
// DESTACA O LAYER DE UM POLIGONO NOS MAPAS
function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 1.5,
    color: 'black',
    fillOpacity: 0.7
  });
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}
function resetHighlight(e) {
  GeoLayer.resetStyle(e.target);
}
// PREPARA A DISTRUIBUICAO DE ACORDO COM OS FILTROS ATIVADOS.
function getDis(featurename){
  if(anoSelecionado!=undefined){
    var dist= distribuicaoAno(featurename);
  }else if(trimestreSelecionado!=undefined){
    var dist= distribuicaoTri(featurename);
  }else if(mesSelecionado!=undefined){
    var dist= distribuicaoMes(featurename);
  }else if(diaSelecionado!=undefined){
    var dist= distribuicaoDia(featurename);
  }else{
    var dist= distribuicaoMes(featurename);
  }
  return dist;
}
function getDis2(featurename){
  if(trimestreSelecionado!=undefined){
    var dist= distribuicaoTri(featurename);
  }else if(mesSelecionado!=undefined){
    var dist= distribuicaoMes(featurename);
  }else if(diaSelecionado!=undefined){
    var dist= distribuicaoDia(featurename);
  }else{
    var dist= distribuicaoMes(featurename);
  }
  return dist;
};

function legendonAdd(map) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (grades.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:'+colorN(grades[i])+'; background:'+colorN(grades[i])+'"></i>'+">"+grades[i]+'</br>';
  }
  return div;
};

//ESCALA DE CORES PARA O MAPA DE PONTOS
function colorD(media){
  var cbf = palette('cb-BuGn', 9);
  //var cbf = palette('cb-BrBG', 11);
  var color;
  gradesDot.forEach(function(d,i){
    if(Number(media)>=d){
      color="#"+cbf[i];
    }
  });
  return color;
}
function colorR(prob){
  var cbf = palette('cb-BuGn', 9);
  var color;
  gradesR.forEach(function(d,i){
    if(Number(prob)>=d){
      color=cbf[i];
    }
  });
  return color;
}
//ESCALA DE CORES PARA PROBABILIDADE
function colorN(d){
  var cbf = palette('cb-BrBG', 11);
  cbf.reverse();
  if(d>=1.0){
    cor= cbf[10];   
  }else if (d>=0.9) {
    cor= cbf[9];  
  }else if(d>=0.8){
    cor= cbf[8];  
  }else if(d>=0.7){
    cor= cbf[7];  
  }else if(d>=0.6){
    cor= cbf[6];  
  }else if(d>=0.5){
    cor= cbf[5];  
  }else if(d>=0.4){
    cor= cbf[4];  
  }else if(d>=0.3){
    cor= cbf[3];  
  }else if(d>=0.2){
    cor= cbf[2];  
  }else if (d>=0.1) {
    cor= cbf[1];  
  }else{
    cor= cbf[0];  
  }
  return cor;
}
//ESCALA DE CORES PARA O MAPA DE MÉDIA
function colorM(media){
  var cbf = palette('cb-BuGn', 9);
  var color;
  grades.forEach(function(d,i){
    if(Number(media)>=d){
      color="#"+cbf[i];
    }
  });
  return color;
}
//COMPARA DOIS ARRAYS DE DISTRUIBUIÇÕES IGUAIS E RETORNA A PROBABILIDADE DO PRIMEIRO SER MENOR QUE O SEGUNDO.
function cmp(dist1,dist2){
  var count=0;
  dist1.forEach(function(d,i){
    if(dist1[i]<dist2[i]){
      count++;
    }
  });
  return (count/dist1.length);
}
// ALTERA A ORDEM DE OBJETOS EM UM ARRAY DE MODO ALEATÓRIO
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
  }
  return array;
}

// ENCONTRA UM OBJETO DENTRO DE UM ARRAY POR UMA CHAVE ID.
function findP(array,id){
  var p;
  array.forEach(function(d,i){
    if(d.id==id){
      p=d;
    }
  });
  return p;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ESSA FUNÇÃO EMBARALHA AS PERGUNTAS CONTIDAS NO ARRAY DE PERGUNTAS E PREENCHE AUTOMATICAMENTO O HTML COM A NOVA ORDEM.
function geraperguntas(perguntas,index,vis){
  var d1= document.createElement("div");
  var d2= document.createElement("div");
  d2.setAttribute('class','card');
  var pergunta= perguntas[index];
  var label = document.createElement("label");//label antes com a pergunta
  label.setAttribute('style',"font-weight:bold;");
  label.setAttribute('for',"pergunta1");
  label.setAttribute('id',"pergunta1");
  label.innerText= pergunta.question_text//[0];//"Pergunta 1 ?";
  var select = document.createElement("select");
  select.setAttribute('id',""+pergunta.id+vis);
  select.setAttribute('name',"pergunta"+pergunta.id+vis);
  select.setAttribute('class',"form-control");
  select.required=true;
  var opt= document.createElement("option");
  opt.value='';
  opt.disabled=true;
  opt.selected=true;
  opt.innerHTML = 'Escolha um';
  select.appendChild(opt);
  var nQ=pergunta.id;
  if (nQ!='004C'&&nQ!='011C'&&nQ!='012C'&&nQ!='017T'&&nQ!='024T'&&nQ!='025T') {
      var div1 = document.createElement("div");
      div1.setAttribute('class','col-sm-3 col-md-3 col-lg-3 col-xl-3');

      var input1= document.createElement("input");
      input1.setAttribute('type','hidden');
      input1.setAttribute('class','clicks');
      input1.setAttribute('id','CLC'+pergunta.id+vis);
      input1.setAttribute('name','CLC'+pergunta.id+vis);
      input1.setAttribute('value','');

      var input2= document.createElement("input");
      input2.setAttribute('type','hidden');
      input2.setAttribute('class','tempo');
      input2.setAttribute('id','TMP'+pergunta.id+vis);
      input2.setAttribute('name','TMP'+pergunta.id+vis);
      input2.setAttribute('value','');

      var inputR= document.createElement("input");
      inputR.setAttribute('type','hidden');
      inputR.setAttribute('id','ANS'+pergunta.id+vis);
      inputR.setAttribute('name','ANS'+pergunta.id+vis);
      inputR.setAttribute('value',''+pergunta.answer);

      if(pergunta.size.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','SIZE:'+pergunta.size);
      }else if(pergunta.variance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','VARIANCE:'+pergunta.variance);
      }else if(pergunta.distance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','DISTANCE:'+pergunta.distance);
      }else{
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','');
      }

      var label2 = document.createElement("label");
      label2.setAttribute('for','CNFC'+pergunta.id+vis);
      label2.setAttribute('style',"font-weight:bold;");
      label2.innerText='De 1 a 5 sendo 1 pouco confiante e 5 muito confiante, quão confiante você está da sua resposta?';

      var input3= document.createElement("input");
      input3.setAttribute('type','text');
      input3.setAttribute('class','ioRangerSlider');
      input3.setAttribute('id','CNFC'+pergunta.id+vis);
      input3.setAttribute('name','CNFC'+pergunta.id+vis);
      input3.setAttribute('value','');
      input3.required=true;

      var input8= document.createElement("input");
      input8.setAttribute('type','text');
      input8.setAttribute('id',""+pergunta.id+vis);
      input8.setAttribute('name',"pergunta"+pergunta.id+vis);
      input8.setAttribute('class','form-control');
      input8.setAttribute('value','');
      if(pergunta.id=="004C"||pergunta.id=="011C"||pergunta.id=="012C"||pergunta.id=="017T"||pergunta.id=="024T"||pergunta.id=="025T"){
        input8.setAttribute('placeholder','Ex: Caruaru');
      }else if(pergunta.id=="026T"){
        input8.setAttribute('placeholder','Ex: 15000');
      }else{
        input8.setAttribute('placeholder','Ex: 50');
      }
      input8.required=true;
        var input4= document.createElement("div");
        var input7= document.createElement("br");
        var input6= document.createElement("p");
        input4.setAttribute('class','invalid-feedback');
        input6.innerText='Informe um valor.';
        input4.appendChild(input7);
        input4.appendChild(input6);
      div1.appendChild(input8);
      div1.appendChild(input4);
      d2.appendChild(label);
      d1.appendChild(div1);
      d2.appendChild(d1);
  }else{
    for (var i = 0; i < pergunta.op.length; i++) {
      var div1 = document.createElement("div");
      div1.setAttribute('class',"form-group col-sm-3 col-md-3 col-lg-3 col-xl-3");
      var input1= document.createElement("input");
      input1.setAttribute('type','hidden');
      input1.setAttribute('class','clicks');
      input1.setAttribute('id','CLC'+pergunta.id+vis);
      input1.setAttribute('name','CLC'+pergunta.id+vis);
      input1.setAttribute('value','');

      var input2= document.createElement("input");
      input2.setAttribute('type','hidden');
      input2.setAttribute('class','tempo');
      input2.setAttribute('id','TMP'+pergunta.id+vis);
      input2.setAttribute('name','TMP'+pergunta.id+vis);
      input2.setAttribute('value','');

      var inputR= document.createElement("input");
      inputR.setAttribute('type','hidden');
      inputR.setAttribute('id','ANS'+pergunta.id+vis);
      inputR.setAttribute('name','ANS'+pergunta.id+vis);
      inputR.setAttribute('value',''+pergunta.answer);

      if(pergunta.size.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','SIZE:'+pergunta.size);
      }else if(pergunta.variance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','VARIANCE:'+pergunta.variance);
      }else if(pergunta.distance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','DISTANCE:'+pergunta.distance);
      }else{
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','');
      }

      var label2 = document.createElement("label");
      label2.setAttribute('for','CNFC'+pergunta.id+vis);
      label2.setAttribute('style',"font-weight:bold;");
      label2.innerText='De 1 a 5 sendo 1 pouco confiante e 5 muito confiante, quão confiante você está da sua resposta?';

      var input3= document.createElement("input");
      input3.setAttribute('type','text');
      input3.setAttribute('class','ioRangerSlider');
      input3.setAttribute('id','CNFC'+pergunta.id+vis);
      input3.setAttribute('name','CNFC'+pergunta.id+vis);
      input3.setAttribute('value','');
      input3.required=true;
      var option= document.createElement("option");
      option.value = pergunta.op[i];
      option.innerHTML = pergunta.op[i];
      select.appendChild(option);
      if(i==pergunta.op.length-1){
        var input4= document.createElement("div");
        var input7= document.createElement("br");
        var input6= document.createElement("p");
        input4.setAttribute('class','invalid-feedback');
        input6.innerText='Você precisa escolher um.';
        input4.appendChild(input7);
        input4.appendChild(input6);
        div1.appendChild(select);
        div1.appendChild(input4);
        d2.appendChild(label);
        d1.appendChild(div1);
        d2.appendChild(d1);
      }
    }
  }
  d2.appendChild(label2);
  d2.appendChild(input3);
  var input5= document.createElement("div");
  input5.setAttribute('class','invalid-feedback');
  input5.innerText='Você precisa escolher um';
  d2.appendChild(input5);
  d2.appendChild(input1);
  d2.appendChild(input2);
  d2.appendChild(inputR);
  d2.appendChild(inputS);
  return d2;
}
// QUANDO O RECPATHCA É COMPLETADO SUBMETE OS FORMS.
function recaptcha_callback(){
  tempofinal= new Date();
  duracaoPerguntas= tempofinal-tempotutorial;
  duracaoPerguntas=math.round(((duracaoPerguntas/1000)/60)*100)/100;

  duracao= tempofinal-tempoinicial;
  duracao=math.round(((duracao/1000)/60)*100)/100;
  $('#duracaototal').val(duracao);
  $('#duracaotutorial').val(duracaotutorial);
  $('#duracaoperguntas').val(duracaoPerguntas);
  
  $('#5Form').submit();
  $('#feedback').val($('#feedback2').val());
  $('#ordem').val(arr.join());
  $('#2Form').submit();
  $('#vis').css('display','none');
  $('#footer').css('display','');
  //$('#Form').submit();
  //$('#3Form').submit();
  //$('#4Form').submit();
  //$('#captchaError').hide();
}

function StartHOPS(){
  hops=true;
}
function StopHOPS(){
  hops=false;
}

function infopropsTaxi(props){
    if(featurename!=undefined){
      if(anoSelecionado!=undefined){
        if(mesSelecionado!=undefined){
          return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+mesSelecionado+'/'+anoSelecionado+'.');
        }else if(trimestreSelecionado!=undefined){
          if(diaSelecionado!=undefined){
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de '+trimestreSelecionado+'ºtrimestre/'+anoSelecionado+'.');
          }else{
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o '+trimestreSelecionado+'º trimestre de '+anoSelecionado+'.');
          }
        }else if(diaSelecionado!=undefined){
          return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de '+anoSelecionado+'.');
        }else{
          return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+anoSelecionado+'.');
        }
      }else if(trimestreSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de'+trimestreSelecionado+'º trimestre no período.');
        }else{
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+trimestreSelecionado+' trimestre no período.');
        }
      }else if(mesSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de o mês de'+mesSelecionado+' no período.');
        }else{
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para mês de '+mesSelecionado+' no período.');
        }
      }else if(diaSelecionado!==undefined){
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias do mês no período.');
      }else{
          return '<h4> Information based on '+featurename+'.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores referentes a todo o período.');
      }
    }else{
      if(anoSelecionado!=undefined){

        if(mesSelecionado!=undefined){
          return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+mesSelecionado+'/'+anoSelecionado+'.');
        }else if(trimestreSelecionado!=undefined){
          if(diaSelecionado!=undefined){
            return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de '+trimestreSelecionado+'ºtrimestre/'+anoSelecionado+'.');
          }else{
            return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o '+trimestreSelecionado+'º trimestre de '+anoSelecionado+'.');
          }
        }else if(diaSelecionado!=undefined){
          return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de '+anoSelecionado+'.');
        }else{
          return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+anoSelecionado+'.');
        }

      }else if(trimestreSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de'+trimestreSelecionado+'º trimestre no período.');
        }else{
            return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+trimestreSelecionado+' trimestre no período.');
        }
      }else if(mesSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de o mês de'+mesSelecionado+' no período.');
        }else{
            return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o mês de '+mesSelecionado+' no período.');
        }
      }else if(diaSelecionado!==undefined){
            return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias do mês no período.');
      }else{
          return '<h4> Informações baseadas na ilha de Manhattan - Nova York / EUA.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para todo o período.');
      }
    }
}
//QUANDO INVOCADA ESSA FUNÇÃO COMPARA UMA AREA COM AS DEMAIS PARA TECNICA DE INTERVALO.
function whenClicked(e) {
  $('#slidert').addClass("disabledslider");
  comparando(e);              
  /*if(featurename==e.target.feature.properties.name){
    featurename=undefined;
  }else{
    featurename=e.target.feature.properties.name;
  }*/
}
function whenClickedC(e) {
  $('#sliderc').addClass("disabledslider");
  comparandoC(e);              
}
function whenClickedT(e) {
  $('#slidertx').addClass("disabledslider");
  comparandoT(e);              
}
function compare(dataset){
  var probab= cmp(getDis(dataset[0].properties.name),getDis(dataset[1].properties.name));

  infoVis02.remove();
  if(layerTuto2!= null){
      layerTuto2.clearLayers();
  }
  layerTuto2 =L.geoJson(dataset,
    {style: function(feature){
        if(opcoes.includes(feature.properties.name)){
          if(opcoes[0]==feature.properties.name){
            if(dataset[0].properties.name==feature.properties.name){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.name){
            if(dataset[0].properties.name==feature.properties.name){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.name==feature.properties.name){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.name==feature.properties.name){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.name+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layerTuto2.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(mapVis02);
  infoVis02.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };
  infoVis02.addTo(mapVis02);
}
function compareTodos(newdata,dataset){
  infoVis02.remove();
  if(layerTuto2!= null){
      layerTuto2.clearLayers();
  }
  layerTuto2 =L.geoJson(dataset,
    {style: function(feature){
        var probab= cmp(getDis(newdata[0].properties.name),getDis(feature.properties.name));
        if(newdata[0].properties.name==feature.properties.name){
          probab=probab;
        }else{
          probab=1-probab;
        }
        if(opcoes.includes(feature.properties.name)){
          if(opcoes[0]==feature.properties.name){
            if(newdata[0].properties.name==feature.properties.name){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "black",
                dashArray: '3',
                fillOpacity: 1.0,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.name){
            if(newdata[0].properties.name==feature.properties.name){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "black",
                dashArray: '3',
                fillOpacity: 1.0,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(newdata[0].properties.name==feature.properties.name){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "black",
              dashArray: '3',
              fillOpacity: 1.0,
              color: 'black'
            };
          }else{
            return {
              weight: 0.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var probab= cmp(getDis(newdata[0].properties.name),getDis(feature.properties.name));
          if(newdata[0].properties.name==feature.properties.name){
            var total=probab;
            layer.bindPopup(feature.properties.name+" chosen to compare with the others regions.");
          }else{
            var total=1-probab;
            layer.bindPopup(""+feature.properties.name+": "+Math.round(total*100)+"%");
          }
        layer.on({
          dblclick: whenClicked
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layerTuto2.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(mapVis02);
  infoVis02.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };
  infoVis02.addTo(mapVis02);
}
function compareC(dataset){
  var probab= cmp(getDis(dataset[0].properties.name),getDis(dataset[1].properties.name));

  infoRange.remove();
  if(LayerRange!= null){
      LayerRange.clearLayers();
  }
  LayerRange =L.geoJson(dataset,
    {style: function(feature){
        if(opcoes.includes(feature.properties.name)){
          if(opcoes[0]==feature.properties.name){
            if(dataset[0].properties.name==feature.properties.name){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.name){
            if(dataset[0].properties.name==feature.properties.name){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.name==feature.properties.name){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.name==feature.properties.name){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.name+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClickedC
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            LayerRange.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(mapRange);
  infoRange.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  infoRange.addTo(mapRange);
}
function compareTodosC(newdata,dataset){
  infoRange.remove();
  if(LayerRange!= null){
      LayerRange.clearLayers();
  }
  LayerRange =L.geoJson(dataset,
    {style: function(feature){
        var probab= cmp(getDis(newdata[0].properties.name),getDis(feature.properties.name));
        if(newdata[0].properties.name==feature.properties.name){
          probab=probab;
        }else{
          probab=1-probab;
        }
        if(opcoes.includes(feature.properties.name)){
          if(opcoes[0]==feature.properties.name){
            if(newdata[0].properties.name==feature.properties.name){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "black",
                dashArray: '3',
                fillOpacity: 1.0,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.name){
            if(newdata[0].properties.name==feature.properties.name){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "black",
                dashArray: '3',
                fillOpacity: 1.0,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(newdata[0].properties.name==feature.properties.name){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "black",
              dashArray: '3',
              fillOpacity: 1.0,
              color: 'black'
            };
          }else{
            return {
              weight: 0.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var probab= cmp(getDis(newdata[0].properties.name),getDis(feature.properties.name));
        if(newdata[0].properties.name==feature.properties.name){
          var total=probab;
          layer.bindPopup(feature.properties.name+" chosen to compare with the others regions.");
        }else{
          var total=1-probab;
          layer.bindPopup(""+feature.properties.name+": "+Math.round(total*100)+"%");
        }
        layer.on({
          dblclick: whenClickedC
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            LayerRange.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(mapRange);
  infoRange.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  infoRange.addTo(mapRange);
}
function compareT(dataset){
  var probab= cmp(distribuicaoNYC(dataset[0].properties.OBJECTID),distribuicaoNYC(dataset[1].properties.OBJECTID));

  infoTaxi.remove();
  if(LayerTaxi!= null){
      LayerTaxi.clearLayers();
  }
  LayerTaxi =L.geoJson(dataset,
    {style: function(feature){
        if(opcoes.includes(feature.properties.OBJECTID)){
          if(opcoes[0]==feature.properties.OBJECTID){
            if(dataset[0].properties.OBJECTID==feature.properties.OBJECTID){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.OBJECTID){
            if(dataset[0].properties.OBJECTID==feature.properties.OBJECTID){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }      
          }
        }else{
          if(dataset[0].properties.OBJECTID==feature.properties.OBJECTID){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.OBJECTID==feature.properties.OBJECTID){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.zone+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClickedT
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            LayerTaxi.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(mapVistaxi);
  infoTaxi.update = function (props) {
    this._div.innerHTML= infopropsTaxi(props);
  };
  infoTaxi.addTo(mapVistaxi);
}
function compareTodosT(newdata,dataset){
  infoTaxi.remove();
  if(LayerTaxi!= null){
      LayerTaxi.clearLayers();
  }
  LayerTaxi =L.geoJson(dataset,
    {style: function(feature){
      var probab= cmp(distribuicaoNYC(newdata[0].properties.OBJECTID),distribuicaoNYC(feature.properties.OBJECTID));
        if(newdata[0].properties.OBJECTID==feature.properties.OBJECTID){
          probab=probab;
        }else{
          probab=1-probab;
        }
        if(opcoes.includes(feature.properties.OBJECTID)){
          if(opcoes[0]==feature.properties.OBJECTID){
            if(newdata[0].properties.OBJECTID==feature.properties.OBJECTID){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "black",
                dashArray: '3',
                fillOpacity: 1.0,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.OBJECTID){
            if(newdata[0].properties.OBJECTID==feature.properties.OBJECTID){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "black",
                dashArray: '3',
                fillOpacity: 1.0,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }      
          }
        }else{
          if(newdata[0].properties.OBJECTID==feature.properties.OBJECTID){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "black",
              dashArray: '3',
              fillOpacity: 1.0,
              color: 'black'
            };
          }else{
            return {
              weight: 0.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
      var probab= cmp(distribuicaoNYC(newdata[0].properties.OBJECTID),distribuicaoNYC(feature.properties.OBJECTID));
        if(newdata[0].properties.OBJECTID==feature.properties.OBJECTID){
          probab=probab;
          layer.bindPopup(feature.properties.zone+" chosen to compare with others regions.");
        }else{
          probab=1-probab;
          layer.bindPopup(""+feature.properties.zone+": "+Math.round(probab*100)+"%");
        }
        layer.on({
          dblclick: whenClickedT
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            LayerTaxi.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(mapVistaxi);
  infoTaxi.update = function (props) {
    this._div.innerHTML= infopropsTaxi(props);
  };
  infoTaxi.addTo(mapVistaxi);
}
// QUANDO INVOCADA ESSA FUNÇÃO COMPARA DUAS ÁREAS RETORNA A PROBABILIDADE DE UMA SER MAIOR QUE A OUTRA
function comparando(e){
  //console.log(e);
  var exists=false;
    selecionados.forEach(function(d,i){
      if(e.target.feature.properties.name==d.target.feature.properties.name){
        exists=true;
      }
    });
    if(exists==false && selecionados.length<3){
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionados.push(e);
      /*if(selecionados.length==2){
        layerTuto2.clearLayers();
        var newdata=[];
        selecionados.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compare(newdata);
      }else */if(selecionados.length==1){
        layerTuto2.clearLayers();
        var newdata=[];
        selecionados.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compareTodos(newdata,dataset);
      }
    }else if(exists==true && selecionados.length>0){
      selecionados=[];
      $('#slidert').removeClass("disabledslider");
      Vis02TutorialFunction(dataset,true);
    }else if(exists){
      var filtered = selecionados.filter(function(el) { return el.target.feature.properties.name != e.target.feature.properties.name; }); 
      selecionados=filtered;
      layerTuto2.resetStyle(e.target);
    }
}
function comparandoC(e){
  //console.log(e);
  var exists=false;
    selecionadosC.forEach(function(d,i){
      if(e.target.feature.properties.name==d.target.feature.properties.name){
        exists=true;
      }
    });
    if(exists==false && selecionadosC.length<3){
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionadosC.push(e);
      /*if(selecionadosC.length==2){
        LayerRange.clearLayers();
        var newdata=[];
        selecionadosC.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compareC(newdata);
      }else */if(selecionadosC.length==1){
        LayerRange.clearLayers();
        var newdata=[];
        selecionadosC.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compareTodosC(newdata,dataset);
      }
    }else if(exists==true && selecionadosC.length>0){
      selecionadosC=[];
      $('#sliderc').removeClass("disabledslider");
      inicioRange(dataset);
    }else if(exists){
      var filtered = selecionadosC.filter(function(el) { return el.target.feature.properties.name != e.target.feature.properties.name; }); 
      selecionadosC=filtered;
      LayerRange.resetStyle(e.target);
    }
}
function comparandoT(e){
  //console.log(e);
  var exists=false;
    selecionadosT.forEach(function(d,i){
      if(e.target.feature.properties.OBJECTID==d.target.feature.properties.OBJECTID){
        exists=true;
      }
    });
    if(exists==false && selecionadosT.length<3){
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionadosT.push(e);
      /*if(selecionadosT.length==2){
        LayerTaxi.clearLayers();
        var newdata=[];
        selecionadosT.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compareT(newdata);
      }else */if(selecionadosT.length==1){
        LayerTaxi.clearLayers();
        var newdata=[];
        selecionadosT.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compareTodosT(newdata,datasettaxi);
      }
    }else if(exists==true && selecionadosT.length>0){
      selecionadosT=[];
      $('#slidertx').removeClass("disabledslider");
      inicioTaxi(datasettaxi);
    }else if(exists){
      var filtered = selecionadosT.filter(function(el) { return el.target.feature.properties.name != e.target.feature.properties.name; }); 
      selecionadosT=filtered;
      LayerTaxi.resetStyle(e.target);
    }
}