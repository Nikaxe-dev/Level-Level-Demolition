// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
const skilltree = {};
skilltree.skills = [];
skilltree.skillconnections = [];
skilltree.skilldivs = [];
skilltree.skillconnectiondivs = [];
skilltree.open = () => {
    states.state = "skills.tree";
    gui.died.style.display = "none";
};
skilltree.createskill = (skill) => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.className = "game-object skill";
    div.style.left = `${skill.x + locations.skilltreex}px`;
    div.style.top = `${skill.y + locations.skilltreey}px`;
    div.style.width = `${skill.size}px`;
    div.style.height = `${skill.size}px`;
    const image = createimage(skill.icon);
    image.className = "game-image skill-icon";
    image.width = skill.size;
    image.height = skill.size;
    div.appendChild(image);
    skilltree.skilldivs.push(div);
    gui.skilltree.appendChild(div);
};
skilltree.createconnection = (connection) => {
    const origin = skilltree.skills[connection.origin];
    const target = skilltree.skills[connection.target];
    if (!origin || !target) {
        return;
    }
    const x1 = origin.x + locations.skilltreex + origin.size / 2;
    const y1 = origin.y + locations.skilltreey + origin.size / 2;
    const x2 = target.x + locations.skilltreex + target.size / 2;
    const y2 = target.y + locations.skilltreey + target.size / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const line = document.createElement("div");
    line.style.position = "absolute";
    line.style.left = `${x1}px`;
    line.style.top = `${y1 - 2}px`;
    line.style.width = `${length}px`;
    line.style.height = "4px";
    line.style.background = "white";
    line.style.transformOrigin = "0 50%";
    line.style.transform = `rotate(${angle}deg)`;
    line.style.pointerEvents = "none";
    line.style.zIndex = "0";
    gui.skilltreeconnections.appendChild(line);
    skilltree.skillconnectiondivs.push(line);
};
skilltree.createtree = () => {
    skilltree.skills.forEach((skill, index) => {
        skilltree.createskill(skill);
    });
    skilltree.skillconnections.forEach((connection, index) => {
        skilltree.createconnection(connection);
    });
};
skilltree.init = () => {
    skilltree.createtree();
    setInterval(() => {
        if (states.state == "skills.tree") {
            camera.x = locations.skilltreex;
            camera.y = locations.skilltreey;
        }
    }, 10);
};
skilltree.newskill = (properties) => {
    const skill = {};
    skill.id = properties.id;
    skill.name = properties.name;
    skill.description = properties.description;
    skill.effect = properties.effect;
    skill.icon = properties.icon;
    skill.init = properties.init;
    skill.apply = properties.apply;
    skill.maxupgrades = properties.maxupgrades;
    skill.price = properties.price;
    skill.pricemultipliers = properties.pricemultipliers;
    skill.x = properties.x;
    skill.y = properties.y;
    skill.size = properties.size;
    skilltree.skills.push(skill);
    return skill;
};
skilltree.newconnection = (properties) => {
    const connection = {};
    connection.origin = properties.origin;
    connection.target = properties.target;
    connection.upgradesrequired = properties.upgradesrequired;
    skilltree.skillconnections.push(connection);
    return connection;
};
