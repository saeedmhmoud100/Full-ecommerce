import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {DeleteReview, getAllReviewsOnProduct, updateReview} from "../../Redux/actions/reviewAction";
import {Notification} from "../useNotification";
const RateItemHook = (data) => {
    const dispatch = useDispatch()


    // delete the review
    const [deleteLoading,setDeleteLoading]= useState(false)

    const deleteReview =async reviewID=>{
        setDeleteLoading(true)
        await DeleteReview(reviewID)
        await dispatch(getAllReviewsOnProduct(data.product,1))
        setDeleteLoading(false)
    }



    // update review

    const [showEdit,setShowEdit]= useState(false)
    const [rate,setRate]= useState(data.rating)
    const [review,setReview]= useState(data.review)
    const [editLoading,setEditLoading]= useState(false)
    const [editSuccess,setEditSuccess]= useState(false)
    const handleCloseEdit=_ => {
        setShowEdit(false)
    }
    const handleShowEdit=_ => {
        setShowEdit(true)
    }

    const handleUpdateReview =async _ =>{
        if(rate>=1){
            setEditLoading(true)
            await dispatch(updateReview(data._id,{review,rating:rate}))
            setEditLoading(false)
            setEditSuccess(true)
        }else{
            Notification('the rating should be not less than 1','warning')
        }
    }
    const updatereview = useSelector(state=> state.review.updateReview)
    console.log(updatereview)
    console.log(editSuccess)
    useEffect(_=>{
        const run = async _ =>{
            await dispatch(getAllReviewsOnProduct(data.product,1))
            Notification('your review has been updated successfully','success')
            handleCloseEdit()
        }
        if(editSuccess && updatereview.data && updatereview.data._id){
            run()
        }
        setEditSuccess(false)
    },[editSuccess])

    return [rate,review,setRate,setReview,deleteReview,showEdit,deleteLoading,editLoading,handleCloseEdit,handleShowEdit,handleUpdateReview]
}

export default RateItemHook