local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
mtb = {}
Tunnel.bindInterface("vrp_taskbar",mtb)

local win = 'idle'

local function startGame()
	repeat 
		Wait(5)
	until(win ~= 'waitingResult')
	return win
end

function mtb.mtb_Taskbar(amount, speed, tipoMinigame)
	if not amount then amount = 3 end
	if not speed then speed = 1 end
	if win == 'idle' then
		win = 'waitingResult'
		SetNuiFocus(true,true)
		SendNUIMessage({abrir = true, quantidade = amount, velocidade = speed, tipoMinigame = tipoMinigame})
		return startGame()
	end
end

RegisterNUICallback("result",function(data,cb)
	SetNuiFocus(false,false)
	win = data.result
	SetTimeout(200,function() win = 'idle' end)
end)