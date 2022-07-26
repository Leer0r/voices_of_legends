function changePage(newPage:string,method:keyof requestsMethods,args:Array<args>) {
    const form = document.createElement("form");
    form.method = method;
    form.action = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${newPage}`;
    for(let i = 0; i < args.length; i++){
        const input = document.createElement("input");
        input.type = 'hidden';
        input.name = args[i].title;
        input.value = args[i].value;
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
}

function sleepFor(sleepDuration:number){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
}