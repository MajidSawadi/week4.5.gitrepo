import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Alert } from "react-bootstrap";
import PublicNavbar from "./components/NavBBar";

import IssueList from "./components/IssueList";
import { ClipLoader } from "react-spinners";

import IssueModal from "./components/IssueModel";
import SearchForm from "./components/SearchForm";

const App = () => {
  const [searchInput, setSearchInput] = useState("facebook/react");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [loading, setLoading] = useState(false);

  const [issues, setIssues] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");

  const [commentPageNum, setCommentPageNum] = useState(1);
  const [commentTotalPageNum, setCommentTotalPageNum] = useState(1);
  const [urlFetchComments, setUrlFetchComments] = useState("");
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);

  function getOwnerAndRepo() {
    const repo = searchInput.substring(searchInput.lastIndexOf("/") + 1);
    const withoutRepo = searchInput.substring(0, searchInput.lastIndexOf("/"));
    const owner = withoutRepo.substring(withoutRepo.lastIndexOf("/") + 1);
    return { repo, owner };
  }

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    const { owner, repo } = getOwnerAndRepo();
    setOwner(owner);
    setRepo(repo);
  };

  const showDetail = (item) => {
    setShowModal(true);
    if (selectedIssue?.number !== item.number) {
      setComments([]);
      setCommentPageNum(1);
      setCommentTotalPageNum(1);
      setSelectedIssue(item);
      setUrlFetchComments(
        `https://api.github.com/repos/${owner}/${repo}/issues/${item.number}/comments?page=1&per_page=5`
      );
    }
  };

  const handleMoreComments = () => {
    if (commentPageNum >= commentTotalPageNum) return;
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${
      selectedIssue.number
    }/comments?page=${commentPageNum + 1}&per_page=5`;
    setCommentPageNum((num) => num + 1);
    setUrlFetchComments(url);
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (!urlFetchComments && !showModal) return;
      setLoadingComments(true);
      try {
        const response = await fetch(urlFetchComments);
        const data = await response.json();
        if (response.status === 200) {
          const link = response.headers.get("link");
          if (link) {
            const getTotalPage = link.match(
              /page=(\d+)&per_page=\d+>; rel="last"/
            );
            if (getTotalPage) {
              setCommentTotalPageNum(parseInt(getTotalPage[1]));
            }
          }
          setComments((c) => [...c, ...data]);
          setErrorMsg(null);
        } else {
          setErrorMsg(`FETCH COMMENTS ERROR: ${data.message}`);
          setShowModal(false);
        }
      } catch (error) {
        setErrorMsg(`FETCH COMMENTS ERROR: ${error.message}`);
        setShowModal(false);
      }
      setLoadingComments(false);
    };
    fetchComments();
  }, [urlFetchComments, showModal]);

  useEffect(() => {
    const fetchIssueData = async () => {
      if (!owner || !repo) return;
      setLoading(true);
      try {
        const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}&per_page=20`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
          const link = response.headers.get("link");
          if (link) {
            const getTotalPage = link.match(
              /page=(\d+)&per_page=\d+>; rel="last"/
            );
            if (getTotalPage) {
              setTotalPageNum(parseInt(getTotalPage[1]));
              setPageNum(parseInt);
            }
          }
          setIssues(data);
          setErrorMsg(null);
          console.log(data);
        } else {
          setErrorMsg(`FETCH ISSUES ERROR: ${data.message}`);
        }
      } catch (error) {
        setErrorMsg(`FETCH ISSUES ERROR: ${error.message}`);
      }
      setLoading(false);
    };
    fetchIssueData();
  }, [owner, repo, pageNum]);
 console.log({totalPageNum});
  return (
    <div className="text-center">
      <PublicNavbar />
      <Container>
        <h1>Github Issues</h1>
        <SearchForm
          searchInput={searchInput}
          handleInputChange={handleSearchInputChange}
          handleSubmit={handleSearchFormSubmit}
          loading={loading}
        />
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      
        {loading ? (
          <ClipLoader color="#f86c6b" size={150} loading={loading} />
        ) : (
          <IssueList itemList={issues} showDetail={showDetail} />
        )}
        <IssueModal
          issue={selectedIssue}
          comments={comments}
          loadingComments={loadingComments}
          showModal={showModal}
          setShowModal={setShowModal}
          handleMore={handleMoreComments}
          disableShowMore={commentPageNum === commentTotalPageNum}
        />
      </Container>
    </div>
  );
};
export default App;

