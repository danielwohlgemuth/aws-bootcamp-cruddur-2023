import './MessageGroupItem.css';
import { Link } from 'react-router-dom';

export default function MessageGroupNewItem(props) {
    return (
        <Link className='message_group_item active' to={ `/messages/new/${props.user.handle}` }>
            <div className='message_group_avatar'></div>
            <div className='message_content'>
                <div className='message_group_identity'>
                    <div className='display_name'>{props.user.display_name}</div>
                    <div className='handle'>@{props.user.handle}</div>
                </div>
            </div>
        </Link>
    );
}