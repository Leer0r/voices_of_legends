type confType = "checkBox" | "text" | "button"

interface arg{
    name:string,
    value:string
}

interface commandOption {
    path:string,
    args:Array<arg>
}

interface gameConfigurationOptions{
    name:string,
    type:confType,
    options:commandOption,
}

interface gameConfigurationPannel{
    name:string
    confOptions:Array<gameConfigurationOptions>
}

interface gameRequirement{
    requirementName:string,
    cpu:string,
    ram:string,
    diskSpace:string,
}

interface gameInterface{
    gameName:string,
    gameRouter:string,
    gameDescription:string,
    confPannel:Array<gameConfigurationPannel>,
    gameRequirements: Array<gameRequirement>
}

const minecraft:gameInterface = {
    gameName:"Minecraft",
    gameRouter:"minecraft",
    gameDescription: "Minecraft est un jeu vidéo de type aventure « bac à sable » (construction complètement libre) développé par le Suédois Markus Persson, alias Notch, puis par la société Mojang Studios. Il s'agit d'un univers composé de voxels et généré de façon procédurale, qui intègre un système d'artisanat axé sur l'exploitation puis la transformation de ressources naturelles (minéralogiques, fossiles, animales et végétales).",
    confPannel: [
        {
            name: "Administration",
            confOptions: [
                {
                    name:"Enable flying",
                    type: "button",
                    options:{
                        path:"/admin/commands/allow/fly",
                        args:[
                            {
                                name:"fly",
                                value:""
                            }
                        ]
                    }
                },
                {
                    name:"Enable PvP",
                    type: "button",
                    options:{
                        path:"/admin/commands/allow/pvp",
                        args:[
                            {
                                name:"pvp",
                                value:""
                            }
                        ]
                    }
                },
                {
                    name:"Enable Command Block",
                    type: "button",
                    options:{
                        path:"/admin/commands/allow/commandBlock",
                        args:[
                            {
                                name:"commandBlock",
                                value:""
                            }
                        ]
                    }
                },
                {
                    name:"Kick player",
                    type: "text",
                    options:{
                        path:"/admin/commands/admin/kickPlayer",
                        args:[
                            {
                                name:"playerName",
                                value:""
                            }   
                        ]
                    }
                },
            ]
        },
        {
            name:"Configuration",
            confOptions:[]
        }
    ],
    gameRequirements: [
        {
            requirementName: "2 personnes",
            cpu:"1",
            diskSpace: "10Go",
            ram:"2Ghz"
        }
    ]
}