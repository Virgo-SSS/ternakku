import '../styles/Contact.css'
import parse from 'html-react-parser'

function Contact(props) {
    return (
        <div id="contact">
            <div className="wrapper">
                <div className="footer ">
                    {
                        props.ContactSection.map((item, index) => {
                            return (
                                <div className="mx-auto">
                                    {parse(item.content)}
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default Contact