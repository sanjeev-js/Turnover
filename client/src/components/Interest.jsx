import React, { useState, useEffect } from 'react'
import { asyncWrap } from "../utils/utils";
import axios from 'axios';

const Interest = () => {

  const [interestData, setInterestData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 6;

  const fetchInterestData = async () => {
    const [error, result] = await asyncWrap(
      axios({
        method: "get",
        url: "interest",
        params: {
          pageNo,
          pageSize
        }
      })
    );
    if (!result) {
      console.log(error);
      return;
    }

    setInterestData(result.data.data);
    setTotal(result.data.total)
  }

  const handleNext = () => {
    if (pageNo >= total / pageSize) {
      return
    } else {
      let page = pageNo + 1
      setPageNo(page)
    }
  }

  const handleBack = () => {
    if (pageNo <= 1) {
      return
    } else {
      let page = pageNo - 1
      setPageNo(page)
    }
  }

  const updateIntrests = async (id) => {
    const [error, result] = await asyncWrap(
      axios({
        method: "put",
        url: "interest",
        data: {
          categoryId: `${id}`
        }
      })
    );

    if (error) {
      console.log(error)
    }

    fetchInterestData();
  }

  useEffect(() => {
    fetchInterestData()
  }, [pageNo])
  return (
    <div style={{ maxWidth: '800px' }} className="container my-5 shadow p-3 mb-5 bg-body-tertiary rounded">
      <h1 className='text-center'>Please mark your interests!</h1>
      <p className='text-center'>We will keep you notified</p>

      <div className='mb-4'>
        <h5>My saved interests</h5>
      </div>
      {interestData && interestData.map((item) =>
        <div key={item.categoryId} className="form-check mb-3">
          <input onChange={(e) => { e.preventDefault(); updateIntrests(item.categoryId) }} checked={item.seleted} className="form-check-input" type="checkbox" value={item.seleted} id={item.categoryName} />
          <label className="ms-3 form-check-label" htmlFor={item.categoryName}>
            {item.categoryName}
          </label>
        </div>
      )}

      <div className='mt-5'>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item" onClick={handleBack}>
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {Array.from({ length: (total / pageSize) + 1 }, (_, index) => (
              <li key={index} onClick={(e) => { setPageNo(index + 1) }} className="page-item"><a className={`page-link active=${index}`}>{index + 1}</a></li>
            ))}
            <li className="page-item" onClick={handleNext}>
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Interest