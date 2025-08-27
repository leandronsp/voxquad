FROM ruby:3.4.4 AS base
WORKDIR /app

FROM base AS release
ENV RAILS_ENV=production
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .
RUN bin/rails assets:precompile
EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
