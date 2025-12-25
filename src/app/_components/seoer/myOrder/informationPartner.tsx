// informationPartner.tsx

import React from 'react';

import { formatDateTime } from '@/utils/format.util';

import MyModal from '../../common/MyModal';

const InformationPartner = ({ isOpen, onClose, data }: { isOpen: boolean, onClose: () => void, data: any }) => {

    return (
        <MyModal
            isOpen={isOpen}
            onClose={onClose}
            header="Thông tin đối tác"
            body={
                <div className="max-w-md bg-white rounded-xl space-y-4">
                    <div className="space-y-2">
                        <div><span className="font-semibold">Email:</span> {data?.email}</div>
                        <div><span className="font-semibold">Số điện thoại:</span> {data?.phone}</div>
                        <div><span className="font-semibold">Tên Telegram:</span> {data?.telegramUsername}</div>
                        <div><span className="font-semibold">Tên ngân hàng (trên thẻ):</span> {data?.bankNameInCard} </div>
                        <div><span className="font-semibold">Số tài khoản ngân hàng:</span> {data?.bankNumber} </div>
                        <div><span className="font-semibold">Tên ngân hàng:</span> {data?.bankName} </div>
                        <div><span className="font-semibold">Ví USDT:</span> {data?.usdt} </div>
                        <div><span className="font-semibold">Ngày tạo:</span> {formatDateTime(data?.createdAt)} </div>
                        <div><span className="font-semibold">Ngày cập nhật:</span> {formatDateTime(data?.updatedAt)} </div>
                    </div>
                </div>


            }
        />
    )
}

export default InformationPartner;