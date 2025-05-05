import javafx.application.Application;
import javafx.stage.*;
import javafx.scene.*;
import javafx.scene.layout.*;
import javafx.scene.control.*;
import javafx.geometry.*;

import java.io.File;
import java.io.IOException;

public class PDFProtectorApp extends Application {

    private File selectedFile;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("PDF Protector (via qpdf)");

        Label fileLabel = new Label("No file selected.");
        Button browseBtn = new Button("Choose PDF");

        TextField userPassField = new TextField();
        TextField ownerPassField = new TextField();
        userPassField.setPromptText("User Password");
        ownerPassField.setPromptText("Owner Password");

        CheckBox allowPrint = new CheckBox("Allow Printing");
        allowPrint.setSelected(true);
        CheckBox allowModify = new CheckBox("Allow Modifying");
        allowModify.setSelected(true);

        Button protectBtn = new Button("Protect PDF");

        browseBtn.setOnAction(e -> {
            FileChooser fileChooser = new FileChooser();
            fileChooser.getExtensionFilters().add(new FileChooser.ExtensionFilter("PDF Files", "*.pdf"));
            selectedFile = fileChooser.showOpenDialog(primaryStage);
            if (selectedFile != null) {
                fileLabel.setText(selectedFile.getName());
            }
        });

        protectBtn.setOnAction(e -> {
            if (selectedFile == null) {
                showAlert("Please select a PDF file.");
                return;
            }

            String userPass = userPassField.getText();
            String ownerPass = ownerPassField.getText();
            if (userPass.isEmpty() || ownerPass.isEmpty()) {
                showAlert("Please enter both passwords.");
                return;
            }

            FileChooser saveChooser = new FileChooser();
            saveChooser.setTitle("Save Protected PDF");
            saveChooser.getExtensionFilters().add(new FileChooser.ExtensionFilter("PDF Files", "*.pdf"));
            File output = saveChooser.showSaveDialog(primaryStage);
            if (output == null) return;

            try {
                String printPerm = allowPrint.isSelected() ? "y" : "n";
                String modifyPerm = allowModify.isSelected() ? "y" : "n";

                ProcessBuilder pb = new ProcessBuilder(
                        "qpdf",
                        "--encrypt", userPass, ownerPass, "128",
                        "--print=" + printPerm,
                        "--modify=" + modifyPerm,
                        "--",
                        selectedFile.getAbsolutePath(),
                        output.getAbsolutePath()
                );
                pb.inheritIO();
                Process process = pb.start();
                int exitCode = process.waitFor();
                if (exitCode == 0) {
                    showAlert("PDF protected and saved successfully.");
                } else {
                    showAlert("Failed to protect PDF. qpdf error code: " + exitCode);
                }

            } catch (IOException | InterruptedException ex) {
                ex.printStackTrace();
                showAlert("An error occurred: " + ex.getMessage());
            }
        });

        VBox layout = new VBox(10);
        layout.setPadding(new Insets(15));
        layout.getChildren().addAll(
                browseBtn, fileLabel,
                new Label("User Password:"), userPassField,
                new Label("Owner Password:"), ownerPassField,
                allowPrint, allowModify,
                protectBtn
        );

        Scene scene = new Scene(layout, 350, 350);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    private void showAlert(String message) {
        Alert alert = new Alert(Alert.AlertType.INFORMATION, message);
        alert.setHeaderText(null);
        alert.setContentText(message);
        alert.showAndWait();
    }
}
