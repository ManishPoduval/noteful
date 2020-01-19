import React from 'react';
import { Route, Link } from 'react-router-dom';
import Main from './Main';
import NOTES from './dummy-store';
import Folders from './Folders'
import SideBar from './SideBar';
import NotePageSideBar from './NotePageSideBar';
import Note from './Note';
import NotefulContext from './NotefulContext';
import './App.css';

class App extends React.Component {
  state = {
    NOTES
  }

  setNotes = NOTES => {
    this.setState({
      NOTES
    })
  }

  

  // Render three Sidebar routes
  renderSidebar() {
    const { NOTES } = this.state;
    return (
      <>
          <Route 
            exact
            path='/' 
            component={SideBar}              
            />

            <Route 
              path='/folders/:folderId' 
              component={SideBar}
               
              />

          <Route 
            exact
            path='/notes/:noteId'
            render={(props) => {
              return <NotePageSideBar 
                {...props} folder={NOTES.folders.find(folder => folder.id === props.match.params.noteId)} />
            }}
            />    
        </>
    )}

  renderMain() {
    const { NOTES } = this.state;
    return (
      <>
        <Route 
          path='/notes/:id' 
          render={( props ) => {
            console.log(props)
            console.log(props.match.params.id)
            const noteTest = NOTES.notes.filter(note => note.folderId === 'b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1')
            console.log(noteTest)
              return (
                <Note
                  notes={NOTES.notes.find(note => note.id === props.match.params.id)}/>)
            }}/>
        
        <Route 
          path='/folders/:folderId' 
          render={( props ) => {
            console.log(props)
              console.log(props.match.params.folderId)
              const noteTest = NOTES.notes.filter(note => note.folderId === 'b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1')
              console.log(noteTest)
                return <Main
                  notes={NOTES.notes.filter(note => note.folderId === props.match.params.folderId)}/>}
                }
    
              />
        
        <Route
          exact
          path='/' 
          render={() => 
            <Main
              notes={NOTES.notes}
             
           />} 
           />    

  
    </>
    )
  }

  
  render() {
    const value = {
      NOTES: this.state.NOTES,
    }
   
    return (

      <div className="App">
       <NotefulContext.Provider value={value}>
        <nav className="App__sidebar">
          {this.renderSidebar()}
        </nav>
        <header className="App__header">
          <h1>
          <Link to="/">Noteful</Link>
          </h1>
        </header>
        <div className="App__main">
          {this.renderMain()}
        </div>
        </NotefulContext.Provider> 
      </div>
        
      );

  }
}


export default App;
