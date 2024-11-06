import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export const Dropzone = () => {
    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
		<div {...getRootProps ()} className="dropzone needsclick dz-clickable" id="dropzone-basic">
			<div className="dz-message needsclick">
				<input {...getInputProps()} />
				{
					isDragActive ?
					<p>Drop the files here ...</p> :
					<p className='text-muted'>Tarik gambar kesini atau <span className='text-primary'>upload file</span></p>
				}
			</div>
		</div>
    )
}
