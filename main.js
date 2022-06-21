var fnar_url = "https://rest.fnar.net";
var fio_url = "https://fio.fnar.net";
var apikey = null;
var username = null;

class MobileFIO
{
	loadInitial()
	{
		const url = window.location.href;
		if(url.slice(0, 35) == "https://apex.prosperousuniverse.com")
		{
			this.authenticate();
		}
		else
		{
			window.setTimeout(() => this.loadInitial(), 1000);
		}
	}
	
	authenticate()
	{
		var fiodata = JSON.parse(localStorage.getItem("fioinfo"));
		if(fiodata != null)
		{
			username = fiodata[0];
			apikey = fiodata[1];
		}
		else
		{
			username = null;
			apikey = null;
		}
		// Wait for authenticate buffer
		const container = document.getElementById("container");
		try
		{
			const buffer = container.firstChild.firstChild.children[1].children[1].firstChild.firstChild;
			if(buffer.firstChild.firstChild.textContent.toUpperCase().includes(" / XIT SETTINGS"))
			{
				const tile = buffer.children[1].firstChild;
				tile.style.background = "#20314E";
				tile.style.position = "static";
				var namelabel;
				var nameinput;
				var apiinput;
				var apilabel;
				if(tile.children.length == 0)
				{
					namelabel = document.createElement("label");
					namelabel.textContent = "FIO Username";
					namelabel.style.fontSize = "14px";
					namelabel.style.color = "#ffffff";
					tile.appendChild(namelabel);
					nameinput = document.createElement("input");
					nameinput.style.backgroundColor = "#42361d";
					nameinput.style.borderBottom = "1px solid #8d6411";
					nameinput.style.padding = "2px";
					nameinput.style.marginBottom = "5px";
					nameinput.addEventListener("input", function(){
						fiodata[0] = nameinput.value;
						localStorage.set("fioinfo", JSON.stringify(fiodata));
					});
					if(username != null && username != undefined){nameinput.value = username;}
					tile.appendChild(nameinput);	
					apilabel = document.createElement("label");
					apilabel.style.color = "#ffffff";
					apilabel.textContent = "FIO API Key";
					apilabel.style.fontSize = "14px";
					tile.appendChild(apilabel);
					apiinput = document.createElement("input");
					apiinput.style.backgroundColor = "#42361d";
					apiinput.style.borderBottom = "1px solid #8d6411";
					apiinput.style.padding = "2px";
					apiinput.addEventListener("input", function(){
						fiodata[1] = apiinput.value;
						localStorage.set("fioinfo", JSON.stringify(fiodata));
					});
					if(apikey != null && apikey != undefined){apiinput.value = apikey;}
					tile.appendChild(apiinput);
				}
				else
				{
					namelabel = tile.children[0];
					nameinput = tile.children[1];
					apilabel = tile.children[2];
					apiinput = tile.children[3];
				}
			}
		} catch(error){console.error(error);}
		window.setTimeout(() => this.authenticate(), 1000);
	}
}

try
{
	console.log("Mobile FIO Loaded");
	const runner = new MobileFIO();
	runner.loadInitial();
}
catch(error)
{
	console.error(error);
}