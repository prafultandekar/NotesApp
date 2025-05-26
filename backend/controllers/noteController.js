const Note = require("../models/Note")


 const createNote = async(req,res)=>{
  const {title , content} = req.body;
  console.log("title" , title)

    try{
        const newNote = new Note({title, content, user: req.userId})
         await newNote.save()
         res.status(200).json(newNote)
    }
    catch(err){
 res.status(500).json({message:"error creating", error:err})
    }
    
 }
// get api
  const getNotes = async(req,res)=>{
   try{
   const notes = await Note.find({user:req.userId}).sort({createdAt:-1})
   res.status(200).json(notes)
   }
   catch(err){
  res.status(500).json({message:'Error fetching notes',error:err})
   }
  }

  // update 

  const updateNote =async(req,res)=>{
    const { id } = req.params;
    const { title, content, color, pinned, tags } = req.body;
   try{
     const updatedNote = await Note.findOneAndUpdate({_id:id,user:req.userId},{title, content, color, pinned, tags}, {new:true})

     if(!updatedNote) return res.status(404).json({message:"Note not found"})
      res.status(200).json(updatedNote);
   }
   
   catch(err){
  res.status(500).json({ message: "Error updating note", error: err });
   }
  }

const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findOneAndDelete({ _id: id, user: req.userId });

    if (!deletedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note", error: err });
  }
};


 module.exports = {createNote,getNotes,updateNote,deleteNote}