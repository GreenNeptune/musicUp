let songs_ar;
let isAscendingOrder = true;

const doApi = async (_url) => {
  let resp = await fetch(_url);
  let data = await resp.json();
  createSongs(data.data)
}

const createSongs = (_ar) => {
  $("#id_row").empty();
  _ar.map(item => {
    let song = new Song("#id_row", item);
    song.render();
    song.init_change_song();
  })
  songs_ar = _ar;
}

const convertSongDurationStr = (time_in_seconds) => {
  seconds = Math.floor(time_in_seconds % 60);
  minutes = Math.floor(time_in_seconds / 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${minutes}:${seconds}`;
}

const sortSongsBy = (_sort) => {
  if (_sort == "artist_name") {
    songs_ar = _.sortBy(songs_ar, (song) => song.artist.name);
  } else {
    songs_ar = _.sortBy(songs_ar, _sort);
  }

  createSongs(songs_ar);
}

const orderSongsBy = (_order) => {
  if (_order == "asc" && !isAscendingOrder) {
    songs_ar = _.reverse(songs_ar);
    isAscendingOrder = true;
  } else if (_order == "desc" && isAscendingOrder) {
    songs_ar = _.reverse(songs_ar);
    isAscendingOrder = false;
  } else {
    return undefined;
  }

  createSongs(songs_ar);
}
