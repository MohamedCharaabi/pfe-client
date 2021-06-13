import React from 'react'
import classnames from 'classnames'
import { htmlToString } from '@utils'
import Avatar from '@components/avatar'
import { Star, Paperclip } from 'react-feather'
import { CustomInput, Media } from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'

const labelColors = {
    personal: 'success',
    company: 'primary',
    important: 'warning',
    private: 'danger'
}

function MailsList({ props }) {

    const {
        mail,

        formatDateToMonthShort,
        onMailClick
    } = props
    const renderLabels = arr => {
        if (arr && arr.length) {
            return arr.map(label => (
                <span key={label} className={`bullet bullet-${labelColors[label]} bullet-sm mx-50`}></span>
            ))
        }
    }
    return (
        <PerfectScrollbar className='email-user-list' options={{ wheelPropagation: false }}>
            {mail ? (
                <ul className='email-media-list'>{

                    <Media tag='li'
                        onClick={() => onMailClick(mail.id)} className={classnames({ 'mail-read': mail.isRead })}
                    >
                        <div className='media-left pr-50'>
                            <Avatar
                                img={mail.from.avatar}
                            />
                            <div className='user-action'>
                                <CustomInput
                                    label=''
                                    type='checkbox'
                                // checked={selectedMails.includes(mail.id)}
                                // id={`${mail.from.name}-${mail.id}`}
                                // onChange={e => e.stopPropagation()}
                                // onClick={e => {
                                //     dispatch(selectMail(mail.id))
                                //     e.stopPropagation()
                                // }}
                                />
                                <div className='custom-control custom-checkbox'>
                                    <input
                                        className='custom-control-input'
                                        type='checkbox'
                                        id={`${mail.from.name}-${mail.id}`}
                                    //   checked={selectedMails.includes(mail.id)}
                                    //   onChange={e => e.stopPropagation()}
                                    //   onClick={e => {
                                    //     dispatch(selectMail(mail.id))
                                    //     e.stopPropagation()
                                    //   }}
                                    />
                                    <label
                                        className='custom-control-label'
                                        htmlFor={`${mail.from.name}-${mail.id}`}
                                    //   onClick={e => {
                                    //     e.stopPropagation()
                                    //   }}
                                    ></label>
                                </div>
                                <div
                                    className='email-favorite'
                                // onClick={e => {
                                //   e.stopPropagation()
                                //   dispatch(updateMails([mail.id], { isStarred: !mail.isStarred }))
                                // }}
                                >
                                    <Star
                                        size={14}
                                        className={classnames({
                                            favorite: mail.isStarred
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                        <Media body>
                            <div className='mail-details'>
                                <div className='mail-items'>
                                    <h5 className='mb-25'>{mail.from.name}</h5>
                                    <span className='text-truncate'>{mail.subject}</span>
                                </div>
                                <div className='mail-meta-item'>
                                    {mail.attachments && mail.attachments.length ? <Paperclip size={14} /> : null}
                                    {renderLabels(mail.labels)}
                                    <span className='mail-date'>{formatDateToMonthShort(mail.time) || '13/5 '}</span>
                                </div>
                            </div>
                            <div className='mail-message'>
                                <p className='text-truncate mb-0'>{htmlToString(mail.message) || '<p>hi thertr</p>'}</p>
                            </div>
                        </Media>
                    </Media>

                }</ul>
            ) : (
                <div className='no-results d-block'>
                    <h5>No Items Found</h5>
                </div>
            )}
        </PerfectScrollbar>


    )
}

export default MailsList
