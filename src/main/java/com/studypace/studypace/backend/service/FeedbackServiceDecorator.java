package com.studypace.studypace.backend.service;

public interface FeedbackServiceDecorator {
    String generateFeedback(String input);

    class GeminiFeedbackDecorator implements FeedbackServiceDecorator {
        @Override
        public String generateFeedback(String input) {
            return "Gemini feedback: " + input;
        }
    }

    class FormattedFeedbackDecorator implements FeedbackServiceDecorator {
        private final FeedbackServiceDecorator wrapped;

        public FormattedFeedbackDecorator(FeedbackServiceDecorator wrapped) {
            this.wrapped = wrapped;
        }

        @Override
        public String generateFeedback(String input) {
            return "[Formatted] " + wrapped.generateFeedback(input);
        }
    }
}