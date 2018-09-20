$(function(){
	var
		$table = $("#table"),
		$ul = $("<ul>"),
		$li = $("<li>"),
		$img = $("<img>"),
		kind = ["c", "d", "h", "s"],
		cards = [],
		cards_len,
		stage_cards = [],
		work_array = [];

	for (var i = 0; i < 4; i++){
		for (var j = 1; j <= 13; j++){
			cards.push(kind[i] + ("0" + j).slice(-2) + ".png");
		}
	}
	cards_len = cards.length;
	shuffle();

	for (var i = 0; i < 7; i++){
		$ul.clone().appendTo($table);
		for (var j = 0; j < 5; j++){
			work_array.push(cards.pop());
			$li
				.clone()
				.data("num", work_array[j].replace(/[^0-9]/g, ""))
				.append(
					$img
						.clone()
						.attr("src", "../images/" + work_array[j])
				)
				.appendTo($table.find("ul").eq(i));
		}
		stage_cards.push(work_array);
		work_array = [];
	}
	console.log(cards);
	console.log(stage_cards);

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
});
