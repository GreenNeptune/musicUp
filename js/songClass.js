class Song {
  constructor(_parent, _item) {
    this.parent = _parent;
    this.title = _item.title;
    this.artist_name = _item.artist.name;
    this.cover_img = _item.album.cover_big;
    this.album = _item.album.title;
    this.preview = _item.preview;
    this.link = _item.link;
    this.duration = _item.duration;
    this.rank = _item.rank;
  }


  render() {
    let newDiv = $(`<div class="song_box col-lg-3 col-md-6 px-0 p-lg-2 my-2"></div>`);
    let songPlayer = $(`<div class="song_player">`);

    let song_row = $(`
      <div class="row m-0 p-md-2 p-lg-0" style="position: relative;"></div>`);

    let song_img = $(`
      <div class="song_img col-4 col-sm-3 p-0 shadow" style="background-image: url(${this.cover_img}); position: relative;">
      </div>`
    );

    let info = $(` 
    <div class="info col-8 col-sm-12 p-sm-0  py-sm-3 ps-sm-2">
    <span class="h5 m-0 text-secondary float-end mx-3">${convertSongDurationStr(this.duration)}</span>
    <div class="artist_name h5 mb-2 text-secondary">${this.artist_name}</div>
    <div class="song_title h5 m-0 text-break text-break">${this.title}
    </div>
    <a href="${this.link}" class="float-end">
      <i class="fa fa-lg fa-external-link mx-3 mt-2" aria-hidden="true"></i>
    </a>
      `);


    $(this.parent).append(newDiv);
    $(newDiv).append(song_row);
    song_row.append(song_img);
    song_img.append(songPlayer);
    $(songPlayer).append(` 
    <i class="fa fa-2x fa-play text-white" aria-hidden="true"></i>`);

    $(song_row).append(info);

    this.song_player = songPlayer;
  }

  init_change_song() {
    $(this.song_player).on("click", () => {
      let audio_box = $("#id_audio_box");
      $(audio_box).empty();
      $(audio_box).html(`
      <audio id="id_audio" controls class="w-100 h-100" style="outline:none">
      <source src="${this.preview}" type="audio/mp3">
      </audio>
        `)

      let audio = document.querySelector("#id_audio");
      audio.play();
    });
  }
}