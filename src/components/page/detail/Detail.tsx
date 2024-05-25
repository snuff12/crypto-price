import React, { SetStateAction, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCoinDetails, numberWithCommas } from "../../../utils/utils";
import styled from "styled-components";
import { ICoinDetail } from "../../../interface";
import EmptyStar from "../../../assets/image/empty-star.png";
import Star from "../../../assets/image/star.png";
import Dropdown from "../../dropdown/Dropdown";
import Arrow from "../../../assets/image/arrow-both.png";
import Loading from "../../loading/Loading";
import ToastContainer from "../../toast/ToastContainer";

const Detail = () => {
  const location = useLocation();
  const coinId = location.pathname.split("/")[2];
  const [coinInfo, setCoinInfo] = useState<ICoinDetail>();
  const [currency, setCurrency] = useState<string>("krw");
  const [tokenAmount, setTokenAmount] = useState<string>("0");
  const [currencyAmount, setCurrencyAmount] = useState<string>("0");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<string>(
    localStorage.getItem("bookmarks") ?? ""
  );
  const [toastList, setToastList] = useState<string[]>([]);

  const handleClickBookmark = (id: string) => {
    const bookmarksArr = bookmarks?.split(",") ?? [];
    if (bookmarks?.includes(id)) {
      bookmarksArr.splice(bookmarksArr.indexOf(id), 1);
      localStorage.setItem("bookmarks", bookmarksArr.toString());
      setBookmarks(localStorage.getItem("bookmarks") ?? "");
      setToastList([...toastList, "북마크가 해제되었습니다."]);
    } else {
      localStorage.setItem("bookmarks", bookmarks + `${bookmarks && ","}${id}`);
      setBookmarks(localStorage.getItem("bookmarks") ?? "");
      setToastList([...toastList, "북마크가 설정되었습니다."]);
    }
  };

  const handleChangeTokenAmount = (e: any) => {
    let tokenAmount = Number(e.target.value.replaceAll(",", ""));
    if (e.nativeEvent.data?.match(/[^0-9 .]/)) {
      return;
    }
    if (isNaN(tokenAmount)) {
      return;
    } else {
      const newTokenAmount =
        numberWithCommas(tokenAmount) +
        (e.target.value.slice(-1) === "." ? "." : "");
      setTokenAmount(newTokenAmount);
      setCurrencyAmount(
        numberWithCommas(
          tokenAmount *
            (currency === "krw"
              ? coinInfo?.currentPrice?.krw ?? 0
              : coinInfo?.currentPrice?.usd ?? 0)
        )
      );
    }
  };
  const handleChangeCurrencyAmount = (
    e: React.ChangeEvent<HTMLInputElement> | any
  ) => {
    let currencyAmount = Number(e.target.value.replaceAll(",", ""));
    if (e.nativeEvent.data?.match(/[^0-9 .]/)) {
      return;
    }
    if (e.target.value === "0.") {
      return;
    }
    if (isNaN(currencyAmount)) {
      return;
    } else {
      const newCurrencyAmount =
        numberWithCommas(currencyAmount) +
        (e.target.value.slice(-1) === "." ? "." : "");
      setCurrencyAmount(newCurrencyAmount);
      setTokenAmount(
        numberWithCommas(
          currencyAmount /
            (currency === "krw"
              ? coinInfo?.currentPrice?.krw ?? 1
              : coinInfo?.currentPrice?.usd ?? 1)
        )
      );
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getCoinDetails(coinId).then((res) => {
      setCoinInfo(res);
      setIsLoading(false);
    });
  }, [coinId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToastList([]);
    }, 8000);
    return () => clearTimeout(timeout);
  }, [toastList]);
  return (
    <DetailContainer>
      <CoinInfo>
        <Info
          bookmarked={bookmarks?.includes(coinId)}
          thumb={coinInfo?.imageUrl ?? ""}
        >
          <div>
            <i onClick={() => handleClickBookmark(coinId)} />
            <i />
            <div>
              {coinInfo?.localization?.ko}({coinInfo?.symbol})
            </div>
          </div>
          <div>
            <div>시가총액 Rank</div>
            <div>Rank #{coinInfo?.rank}</div>
          </div>
        </Info>
        <MarketInfo>
          <Dropdown
            onClickElement={setCurrency}
            title={`${currency.toUpperCase()} 보기`}
            elements={["KRW", "USD"]}
          />
          <div>
            {currency === "krw"
              ? "₩" + numberWithCommas(coinInfo?.currentPrice?.krw ?? "-")
              : "$" + numberWithCommas(coinInfo?.currentPrice?.usd ?? "-")}
            <div>
              {currency === "krw"
                ? coinInfo?.priceChangePercent?.krw?.toFixed(1) + "%"
                : coinInfo?.priceChangePercent?.usd?.toFixed(1) + "%"}
            </div>
          </div>
          <div>
            <div>
              <div>시가총액</div>
              <div>
                {currency === "krw"
                  ? "₩" + numberWithCommas(coinInfo?.marketCap?.krw ?? "-")
                  : "$" + numberWithCommas(coinInfo?.marketCap?.usd ?? "-")}
              </div>
            </div>
            <div>
              <div>24시간 거래대금</div>
              <div>
                {currency === "krw"
                  ? "₩" + numberWithCommas(coinInfo?.volume?.krw ?? "-")
                  : "$" + numberWithCommas(coinInfo?.volume?.usd ?? "-")}
              </div>
            </div>
          </div>
        </MarketInfo>
      </CoinInfo>
      <PriceCalculator>
        <div>가격 계산</div>
        <div>
          <div>{coinInfo?.symbol}</div>
          <input
            value={tokenAmount}
            onChange={handleChangeTokenAmount}
            placeholder="0"
          />
          <i />
          <div>{currency.toUpperCase()}</div>
          <input
            value={currencyAmount}
            onChange={handleChangeCurrencyAmount}
            placeholder="0"
          />
        </div>
      </PriceCalculator>
      {(coinInfo?.description?.ko || coinInfo?.description?.en) && (
        <Description>
          <div onClick={() => setIsOpen((isOpen) => !isOpen)}>
            설명 보기 <i />
          </div>
          {isOpen && (
            <div>
              {coinInfo?.description?.ko ?? coinInfo?.description?.en ?? ""}
            </div>
          )}
        </Description>
      )}
      {isLoading && <Loading />}
      <ToastContainer toastList={toastList} />
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CoinInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Info = styled.div<{ bookmarked: boolean; thumb: string }>`
  display: flex;
  flex-direction: column;
  > div:nth-child(1) {
    > i:nth-child(1) {
      width: 20px;
      height: 20px;
      display: inline-block;
      background-image: ${(props) =>
        props.bookmarked ? `url(${Star})` : `url(${EmptyStar})`};
      background-size: cover;
    }
    > i:nth-child(2) {
      width: 20px;
      height: 20px;
      display: inline-block;
      background-image: ${(props) => `url(${props.thumb})`};
      background-size: cover;
    }
  }
  > div:nth-child() {
  }
  > div:nth-child() {
  }
`;

const MarketInfo = styled.div`
  display: flex;
  flex-direction: column;
  > div:nth-child(1) {
  }
  > div:nth-child() {
  }
  > div:nth-child() {
  }
`;

const PriceCalculator = styled.div`
  width: 100%;
  > div {
    display: flex;
    justify-content: space-between;
    > div {
      background-color: lightgray;
    }
    > i {
      width: 20px;
      height: 20px;
      background-image: url(${Arrow});
      background-size: cover;
    }
  }
`;

const Description = styled.div``;

export default Detail;
