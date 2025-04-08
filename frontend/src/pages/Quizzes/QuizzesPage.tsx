import useFetch from "@/hooks/useFetch";
import { fetchAllQuizzes } from "@/services/AuthService/quizzesService";
import { ClipLoader } from "react-spinners";
import c from "./quizzesPage.module.css";
import { Quiz } from "@/types/Quiz";
import { QuizCard } from "@/components";
import { useAuth } from "@/contexts";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

export function QuizzesPage() {
  const { user } = useAuth();
  const { search } = useLocation();
  const [filteredData, setFilteredData] = useState<Quiz[]>([]);

  const { data, isLoading, error } = useFetch<Quiz[]>(fetchAllQuizzes);

  useEffect(() => {
    if (data) {
      const searchQuery = new URLSearchParams(search).get("search");
      if (searchQuery) {
        const filteredQuizzes = data.filter((quiz) =>
          quiz.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filteredQuizzes);
      } else {
        setFilteredData(data);
      }
    }
  }, [data, search]);

  if (isLoading) {
    return (
      <div className="loader">
        <ClipLoader size={100} color="#669e76" />
      </div>
    );
  }

  if (error) throw new Error(error);

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="container">
        <p>No items found.</p>
      </div>
    );
  }

  return (
    <div className={`container ${c.quizzesContainer}`}>
      <div className={c.headerText}>
        <h1>
          {user ? (
            <>
              Welcome back,{" "}
              <span className={c.highlight}>{user.username} 👋</span>
            </>
          ) : (
            "Welcome to Dump Quiz!"
          )}
        </h1>
        <p>
          Test your knowledge and learn something new with our curated selection
          of quizzes. Browse through various topics, pick what interests you,
          and challenge yourself!
        </p>
      </div>
      <div className={c.quizCardsWrapper}>
        {filteredData.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
