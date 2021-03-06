// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica.

$(document).ready(function () {

  // chiamata ajax per creare cd
  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/array/music",
    method: "GET",
    success: function(data,stato) {
      var album = data.response;
      console.log(album);
      // variabili per handlebars
      var source = $('.album-template').html();
      var template = Handlebars.compile(source);
      // ciclo for per estrapolare singoli cd dai quali prendere elementi di ciascuno
      for (var i = 0; i < album.length; i++) {
        var singoloAlbum = album[i];
        var context = {
          "cover": singoloAlbum.poster,
          "title": singoloAlbum.title,
          "artist": singoloAlbum.author,
          "year": singoloAlbum.year,
          "genre": singoloAlbum.genre
        };
        var html = template(context);
        // inserisco i dischi in html
        $('.box').append(html);
      }
    },
    error: function(richiesta,stato,errore){
      alert("Chiamata fallita!!!");
    }
  });

  // cambio genere con on change, facendo vedere solo il genere selezionato
  $(".filtro-genere select").on("change", function(){
    var selezioneGenere = $(this).val().toLowerCase();
    if(selezioneGenere === ""){
      $('.container').show();
    } else {
      $(".container").each(function(){
        var genereCd = $(this).data("genre").toLowerCase();
        if (genereCd === selezioneGenere){
          $(this).show();
        } else {
          $(this).hide();
        }
      })
    }

  });


});
