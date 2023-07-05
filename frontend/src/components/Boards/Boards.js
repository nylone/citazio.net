export async function GetBoards() {
    let response = await fetch(`${this.$path}/boards/get`, {
        method: 'GET',
        credentials: 'include',
    });
    response = await response.json()
    return response
}

export async function EditBoard(board_path, pub) {
    let title = document.getElementById("bname").value
    let body
    if (title !== "") body= JSON.stringify({"pub": pub, "title": title})
    else body = JSON.stringify({"pub": pub})

    let response = await fetch(`${this.$path}/board/${board_path}/update`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    })
    if (response.status === 200) {
        this.$emit('close:edit')
        return true
    }
    else {
        return false
    }
}

export async function AddBoard(pub) {
    let title = document.getElementById('bname').value
    let path = document.getElementById('bpath').value

    let response = await fetch(`${this.$path}/boards/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "title": title, "path": path, "pub": pub })
    })
    if (response.status === 200) {
        this.$emit("close:addboard")
        this.$emit("added")
        return null
    }
    else {
        return false
    }
}


export function RmBoard(board) {
    fetch(`${this.$path}/board/${board.path}/remove`, {
        method: 'POST',
        credentials: 'include',
    })
    .then(response => {
        if (response.status === 200) {
            this.$emit("rmboardsuccess")
        }
    })
}

export async function TransferBoard(board_path) {
    let uname = document.getElementById("uname").value
    let response = await fetch(`${this.$path}/board/${board_path}/transfer`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "uname": uname })
    })
    if (response.status === 200) {
        this.$emit('close:transfer')
        return null
    }
    else {
        return false;
    }
}

export async function AddUserBoard(board_path, lvl) {
    let uname = document.getElementById("uname").value
    let access_lvl = lvl

    let response = await fetch(`${this.$path}/board/${board_path}/users/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "uname": uname, "access_lvl": access_lvl })
    })
    if(response.status === 200) {
        this.$emit('close:adduser')
        return null
    }
    else {
        return false
    }
}

export async function RmUserBoard(board_path) {
    let uname = document.getElementById('user').value
    let response = await fetch(`${this.$path}/board/${board_path}/user/${uname}/remove`, {
        method: 'POST',
        credentials: 'include'
    })
    if(response.status === 200) {
        this.$emit('close:rmuser')
        return null
    }
    else {
        return false
    }
}


export async function GetBoardUsers(board_path, user) {
    let users = await fetch(`${this.$path}/board/${board_path}/users/get`, {
        method: 'GET',
        credentials: 'include',
    })
    users = await users.json();
    if(users === null) {
        return 0
    }
    else {
        let usersmap = new Map(users.map(e => [e.username, true]))
        if(usersmap.get(user.value)) {
            return users.find(o => o.username === user.value).access_lvl
        }
        else {
            return 0
        }
    }

}