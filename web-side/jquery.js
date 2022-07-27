window.addEventListener("message",function(event){
	let {abrir, quantidade, velocidade, tipoMinigame} = event.data

	if(abrir){
		$("main").show()
		$(".quantidade").text(quantidade)
	}

	if(tipoMinigame === 1){

		$(".jogo1").show()
		clearInterval(barraCrescendo);
		var tamanhoBarra = 380

		$(".circulo-background-svg circle:eq(1)").css("stroke","rgba(214, 214, 214, 0.801)")
		$(".circulo-verde-svg circle:eq(0)").css("stroke","rgba(15, 150, 190, 0.63)")

		var rotacoes = [
			// {posicao: 432, rotacao: 200},
			// {posicao: 350, rotacao: 120},
			// {posicao: 329, rotacao: 140},
			{posicao: 308, rotacao: 160},
			{posicao: 287, rotacao: 180},
			{posicao: 266, rotacao: 200},
			{posicao: 245, rotacao: 220},
			{posicao: 224, rotacao: 240},
			{posicao: 203, rotacao: 260},
			{posicao: 182, rotacao: 280},
			{posicao: 161, rotacao: 300},
			{posicao: 140, rotacao: 320},
			{posicao: 119, rotacao: 340},
			{posicao: 98, rotacao: 360},
			{posicao: 77, rotacao: 380},
			{posicao: 56, rotacao: 400},
		]
		
		var valorAleatorio = rotacoes[Math.floor((Math.random() * rotacoes.length))]
		
		document.onkeydown = function(data){
			if(data.which == 69){
				if((tamanhoBarra <= valorAleatorio.posicao) && (tamanhoBarra >= valorAleatorio.posicao-20)){
					quantidade -= 1
					$(".quantidade").text(quantidade)
					tamanhoBarra = 380
					valorAleatorio = rotacoes[Math.floor((Math.random() * rotacoes.length))]
					if(quantidade == 0){
						$.post("http://vrp_taskbar/result", JSON.stringify({result: true}));
						$("main").hide()
						$(".jogo1").hide()
						clearInterval(barraCrescendo);
					}
				}else{
					$(".jogo1").hide()
					perder()
					clearInterval(barraCrescendo);
				}
			}
		}
		
		var barraCrescendo = setInterval(() => {
			$("circle:eq(1)").css("stroke-dashoffset",`${tamanhoBarra}`)
			$(".circulo-verde-svg svg").css("transform", `rotate(${valorAleatorio.rotacao}deg)`)
			if((tamanhoBarra <= valorAleatorio.posicao) && (tamanhoBarra >= valorAleatorio.posicao-20)){
				$(".circulo-verde-svg circle").css("stroke", "rgba(35, 216, 255, 0.90)")
			}else{
				$(".circulo-verde-svg circle").css("stroke", "rgba(15, 150, 190, 0.63)")
			}
			
			tamanhoBarra -= 2
			if(tamanhoBarra <= 0){
				$(".jogo1").hide()
				perder()
			    clearInterval(barraCrescendo);
			} 
		},velocidade)

	}else{
		$(".jogo2").show()

		var rotacao = 80
		clearInterval(barraGirando);

		$(".circulo-background-svg circle:eq(1)").css("stroke","rgba(15, 150, 190, 0.63)")
		$(".circulo-verde-svg circle:eq(0)").css("stroke","rgba(214, 214, 214, 0.801)")

		document.onkeydown = function(data){
			if(data.which == 69){
				if(rotacao >= 247 && rotacao <= 273){
					quantidade -= 1
					$(".quantidade").text(quantidade)
					if(quantidade == 0){
						$.post("http://vrp_taskbar/result", JSON.stringify({result: true}));
						$("main").hide()
						$(".jogo2").hide()
						clearInterval(barraGirando);
						rotacao = 80
					}
				}else{
					$.post("http://vrp_taskbar/result", JSON.stringify({result: false}));
					$(".jogo2").hide()
					$("main").hide()
					clearInterval(barraGirando);
					rotacao = 80
				}
			}
		}
		
		var barraGirando = setInterval(() => {
			$(".circulo-verde-svg svg").css("transform", `rotate(${rotacao}deg)`)
			rotacao += 2
			if(rotacao == 440) rotacao = 80
		},velocidade)
	}
})

const perder = () => {
	$.post("http://vrp_taskbar/result", JSON.stringify({result: false}));
	$("main").hide() 
}