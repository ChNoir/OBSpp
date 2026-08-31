// import { ActionGridShard } from "./ActionGrid.shard";
// import { ActionGridJSON, ActionItem } from "./type";

// export class ActionGrid extends ActionGridShard  {

//     private ActionFunctions : { [key: string] : (a: ActionItem) => void } = {};
//     private json ?: ActionGridJSON ;
//     private id : string;

//     constructor( id : string , actionFunctions ?: { [key: string] : (a: ActionItem) => void } ) {
//         super();
//         this.id = id;
//         this.ActionFunctions = actionFunctions ?? {};
//     }

    
//     build( json : ActionGridJSON , container ?: HTMLElement) {

//         if ( json && json.actions && json.actions.length === 0 ) {  return; }

     
//         const div = container ?? document.createElement("div");

//         for (const action of json.actions) {
//             const button = this.createActionButton(action);
//             div.appendChild(button);
//         }


//         this.json = json;
//     }

//     save() {
//         return this.json;
//     }

//     addAction( action : ActionItem ) {
//         this.json?.actions.push(action);
//     }
//     addActionFunction( name : string , func : (a: ActionItem) => void ) {
//         this.ActionFunctions[name] = func;
//     }



//     createActionButton(ActionItem : ActionItem) : HTMLButtonElement {
//         const button = document.createElement("button");
//         button.className = "action-button";
//         button.style.background = ActionItem.color;

//         if (ActionItem.icon) {
//             const img = document.createElement("img");
//             img.className = "action-button-icon";
//             img.src = ActionItem.icon;
//             img.alt = ActionItem.label;

//             button.appendChild(img);
//         }

//         const label = document.createElement("div");
//         label.className = "action-button-label";
//         label.textContent = ActionItem.label;

//         button.appendChild(label);

//         button.addEventListener("click", () => {
//             if (ActionItem.disabled) { return; }
//             this.ActionFunctions[ActionItem.nameFunction ?? ""]?.(ActionItem);
//         });

//         return button;
//     }
// }