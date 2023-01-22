import { Modal, useMantineTheme } from '@mantine/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import { reportPost } from '../../actions/postAction';


const PostDeleteModal = ({modalOpen,setModalOpen,id,currentUser}) => {
    const theme = useMantineTheme();
    const dispatch = useDispatch()
    const handleReport = (e)=>{
        e.preventDefault()
        dispatch(reportPost(id,currentUser))
        console.log(currentUser,id,'reporttmodal.jsx')
    }
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.02}
      overlayBlur={3}
      size='55%'
      opened = {modalOpen}
      onClose = {()=>setModalOpen(false)}
      
    >
     <span style={{display:"flex",flexDirection:"row",gap:"10px"}}>Are you sure you want to report this post? <button className='button' onClick={handleReport}>Yes</button></span>
    </Modal>
  )
}

export default PostDeleteModal