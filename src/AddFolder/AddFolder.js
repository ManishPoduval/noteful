import React from 'react';
import NotefulContext from '../NotefulContext';

class AddFolder extends React.Component {
    // Create form which accepts inputs and arranges into API call
    // API call to post to folders list
    // Add folder to context, callback function in context to add to state
    // Add button to Sidebar to invoke the form
    static contextType = NotefulContext;

    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.state = {
            name: ''
        }
    }


    updateName(name) {
        this.setState({ name: name});
        console.log(this.state.name)
    }

    
    
    handleSubmit = event => {
        event.preventDefault()
       
        const { name } = this.state;
        console.log(name);
        const folder = {
           name
        }
        console.log(folder)

        fetch('http://localhost:9090/folders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder),
        })
        .then(res => {
            if(!res.ok)
                return res.json().then(e => Promise.rejected(e))
            return res.json()
        })
        .then(folder => {
            this.context.addFolder(folder)
            this.props.history.push(`/folder/${folder.id}`)
        })
        .catch(error => {
            console.error({ error })
        })
    } 

    
    
    render() {
        return (
            <div className="AddFolder">
                <h2>Add Folder</h2>
                <form 
                    className="AddFolder_form"
                    onSubmit={e => this.handleSubmit(e)}
                    action='#'>
                    
                    <label htmlFor="name">Folder Name</label>
                    <input
                        type="text"
                        id="name"
                        className="AddFolder_name"
                        name="name"
    
                        onChange={e => this.updateName(e.target.value)}

                        />
                    <button
                        type="submit">
                            Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default AddFolder;