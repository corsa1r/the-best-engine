define(function() {

    function CommandsTranslator(commandsList, e) {
        var controllCommand = null;

        for (var x in commandsList) {
            if (commandsList[x] === e.which) {
                e.name = x;
                controllCommand = e;
                break;
            }
        }

        return controllCommand;
    }
    
    return CommandsTranslator;
});