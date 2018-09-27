$(function(){
	var
		$table = $("#table"),
		$ul = $("<ul>"),
		$li = $("<li>"),
		$img = $("<img>"),
		$deck = $("#deck"),
		$set = $("#set").find("img"),
		kind = ["c", "d", "h", "s"],
		cards = [],
		cards_len,
		stage_cards = [],
		work_array = [],
		set_flag = false,
		on_flag = false,
		col_length,
		set_card,
		compare_card;

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

	$deck.on("click", function(){
		if (!set_flag){
			set_flag = true;
			set_card = cards.pop();
			$set.attr("src", "../images/" + set_card);
			compareCards(set_card.replace(/[^0-9]/g, ""));
		}
	});

	function compareCards(set_num){
		console.log(stage_cards);
		set_num = parseInt(set_num, 10);
		$table.find("li").off("click");
		on_flag = false;

		for (var i = 0; i < 7; i++){
			if (stage_cards[i].lencth === 0) {
				continue;
			}

			col_length = stage_cards[i].length - 1;
			compare_card = stage_cards[i][col_length].replace(/[^0-9]/g, "");
			compare_card = parseInt(compare_card, 10);

			if (set_num === compare_card + 1 || set_num === compare_card + 12){
				setClickCard(i, col_length);
			} else if (set_num === compare_card - 1 || set_num === compare_card - 12){
				setClickCard(i, col_length);
			}
		}
		if (!on_flag) {
			set_flag = false;
		}
	}

	function setClickCard(col, len){
		on_flag = true;
		$table.find("ul").eq(col).find("li").eq(len).on("click", function() {
			set_card = stage_cards[col].pop();
			$set.attr("src", "../images/" + set_card);
			compareCards(set_card.replace(/[^0-9]/g, ""));
			$(this).remove();
		});
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
});
