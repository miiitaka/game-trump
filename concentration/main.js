$(function(){
  "use strict";

  var
    $table = $("#table"),
    $li = $("<li>"),
    $img = $("<img>"),
    kind = ["c", "d", "h", "s"],
    cards = [],
    cards_len,
    select_index = [],
    select_num = "",
    $timer = $("#timer"),
    default_time = 180,
    time = default_time,
    minute,
    second,
    check_timer,
    game_start = false,
    hit_count = 0,
    $result_wrapper = $("#result_wrapper"),
    $result = $("#result");

  $timer.text(setTime());

  for (var i = 0; i < 4; i++){
    for (var j = 1; j <= 13; j++){
      cards.push(kind[i] + ("0" + j).slice(-2) + ".png");
    }
  }

  cards_len = cards.length;

  shuffle();

  for (i = 0; i < cards_len; i++){
    $li
      .clone()
      .data("num", cards[i].replace(/[^0-9]/g, ""))
      .addClass("card is-surface")
      .append(
        $img
          .clone()
          .attr("src", "../images/z01.png")
          .addClass("card_surface")
      )
      .append(
        $img
          .clone()
          .attr("src", "../images/" + cards[i])
          .addClass("card_reverse")
      )
      .appendTo($table);
  }

  $table.on("click", "li", function(){
    if (!game_start){
      startCountDown();
      game_start = true;
    }
    $(this).toggleClass("is-surface").toggleClass("is-reverse");

    if (select_num === ""){
      select_num = $(this).data("num");
      select_index.push($(this).index());
    } else {
      if ($(this).index() !== select_index[0]){
        select_index.push($(this).index());
        if ($(this).data("num") === select_num){
          setTimeout(card_ok, 1000);
        } else {
          setTimeout(card_reverse, 1000);
        }
      } else {
        select_num = "";
        select_index = [];
      }
    }
  });

  function card_reverse(){
    $table.find("li").eq(select_index[0]).toggleClass("is-surface").toggleClass("is-reverse");
    $table.find("li").eq(select_index[1]).toggleClass("is-surface").toggleClass("is-reverse");
    select_num = "";
    select_index = [];
  }

  function card_ok(){
    $table.find("li").eq(select_index[0]).addClass("hit");
    $table.find("li").eq(select_index[1]).addClass("hit");
    select_num = "";
    select_index = [];
    hit_count += 2;
    if (hit_count === cards_len){
      setResult("Game Clear!!");
    }
  }

  function shuffle() {
    var
      len = cards_len - 1,
      tmp,
      j;

    for (var i = len; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      tmp = cards[i];
      cards[i] = cards[j];
      cards[j] = tmp;
    }
  }

  function startCountDown() {
    check_timer = setInterval(function() {
      time--;
      $timer.text(setTime());
      if (time === 59) {
        $timer.addClass("limit");
      } else if (time === 0) {
        $timer.text("Time UP!");
        setResult("Game Over!");
      }
    }, 1000);
  }

  function setTime() {
    minute = ("0" + Math.floor(time / 60)).slice(-2);
    second = ("0" + time % 60).slice(-2);
    return minute + "：" + second;
  }

  function setResult(text) {
    $table.off("click");
    $result_wrapper.toggle();
    $("#result_title").text(text);
    $("#result_count").text(hit_count);
    clearInterval(check_timer);
  }

  $result.css({
    'top': ($(window).height()-$result.innerHeight())/2,
    'left': ($(window).width()-$result.innerWidth())/2
  });
});
