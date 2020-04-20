// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica.

$(document).ready(function () {

  // variabili per handlebars
  var source = $('.album-template').html();
  var template = Handlebars.compile(source);

  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/array/music",
    method: "GET",
    success: function(data,stato) {
      var album = data.response;
      console.log(album);
      for (var i = 0; i < album.length; i++) {
        var singoloAlbum = album[i];
        var context = {
          "cover": singoloAlbum.poster,
          "title": singoloAlbum.title,
          "artist": singoloAlbum.author,
          "year": singoloAlbum.year
        };
        var html = template(context);
        $('.box').append(html);
      }
    },
    error: function(richiesta,stato,errore){
      alert("Chiamata fallita!!!");
    }
  });


});