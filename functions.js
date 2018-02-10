function dropdownMenu() {
    document.getElementById("dropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if(!event.target.matches('.dropmenu')){
        var dropwdowns = document.getElementsByClassName("dd-items");
        for (var i = 0; i<dropwdowns.length; i++)
            {
                var openDD = dropwdowns[i];
                if (openDD.classList.contains('show'))
                    {
                        openDD.classList.remove('show');
                    }
            }
    }
}
